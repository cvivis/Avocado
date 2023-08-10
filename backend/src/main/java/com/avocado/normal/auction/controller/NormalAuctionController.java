package com.avocado.normal.auction.controller;


import com.avocado.live.auction.controller.dto.AuctionOnAndOffDto;
import com.avocado.live.auction.controller.dto.BidDto;
import com.avocado.live.auction.controller.dto.ChatDto;
import com.avocado.live.auction.service.BidService;
import com.avocado.live.board.domain.entity.LiveAuction;
import com.avocado.normal.auction.controller.dto.NormalBidRequestDto;
import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import com.avocado.normal.auction.service.NormalAuctionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;


@RestController
@RequiredArgsConstructor
@Slf4j
public class NormalAuctionController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NormalAuctionService normalAuctionService;
    private final BidService bidService;

    @MessageMapping("/chat")
    public void sendMessage(NormalBidRequestDto messageDto, SimpMessageHeaderAccessor accessor) {
        log.info(messageDto.toString());
        simpMessagingTemplate.convertAndSend("/sub/chat", messageDto);
    }

    @MessageMapping("/normal/{id}")
    public void normalBid(@DestinationVariable("id") Long id, NormalBidRequestDto normalBidRequest) {
        log.info(normalBidRequest.toString());

        NormalBidResponseDto topBid = normalAuctionService.doBid(normalBidRequest);

        simpMessagingTemplate.convertAndSend("/sub/normal/" + id, topBid);
    }


    //라이브 관련 stomp
    //pub : 관리자 - 경매 시작 및 종료
    //sub : 사용자 - 시작 시 경매 입찰 활성화, 종료 시 경매 입찰 비활성화
    @MessageMapping(value = "/auction/status")
    public void auctionOnAndOff(AuctionOnAndOffDto auctionOnAndOffDto) {
        Integer status = auctionOnAndOffDto.getOnAndOff();
        if(status == 1) {
            //경매시작
            LiveAuction liveAuction = bidService.liveAuctionBegin(auctionOnAndOffDto.getAuctionId());
            if(!Objects.isNull(liveAuction)) {
                auctionOnAndOffDto.setTitle(liveAuction.getItem().getName());
                simpMessagingTemplate.convertAndSend("/sub/auction/status/"+auctionOnAndOffDto.getBroadcastId(),auctionOnAndOffDto);
            }
        }
        else if(status == 2) {
            //경매 종료
            //TODO : item 테이블 업데이트(유찰,낙찰)
            LiveAuction liveAuction = bidService.liveAuctionStop(auctionOnAndOffDto.getAuctionId());
            if(!Objects.isNull(liveAuction)) {
                auctionOnAndOffDto.setTitle(liveAuction.getItem().getName());
                auctionOnAndOffDto.setSuccess_member_email(liveAuction.getEmail());
                auctionOnAndOffDto.setSuccess_price(liveAuction.getSuccessPrice());
                simpMessagingTemplate.convertAndSend("/sub/auction/status/"+auctionOnAndOffDto.getBroadcastId(),auctionOnAndOffDto);
            }
        }
    }

    //pub : 관리자 - 방송 종료
    //sub : 사용자 - 방송 종료 확인 후 퇴장 처리
    @MessageMapping(value = "/broadcast/off/{id}")
    public void broadcastOff(@DestinationVariable Long id) {
        bidService.broadcastOnAndOff(id, false);
        simpMessagingTemplate.convertAndSend("/sub/broadcast/off/"+id,id);
    }

    //pub : 사용자 - 입찰
    //sub : 사용자 - 입찰 내역 확인
    @MessageMapping("/auction/bid")
    public void bid(BidDto bidRequestDto) {
        //TODO :클라이언트에서 받은 email과 실제인증 유저의 email이 같은지 검증할 필요가 있음

        if(bidService.bid(bidRequestDto.getAuctionId(),bidRequestDto.getBid_price(), bidRequestDto.getBidMemberEmail())) {
            bidRequestDto.setStatus(true); //입찰 성공
        }
        else bidRequestDto.setStatus(false); //입찰 실패
        simpMessagingTemplate.convertAndSend("/sub/auction/bid/"+bidRequestDto.getBroadcastId(),bidRequestDto);
    }


    //TODO : 채팅 기능 -> openvidu or websocket 아직 미정
    @MessageMapping("/live/chat")
    public void chat(ChatDto chatDto) {
        log.info("[StompController chat] chatDto: {}", chatDto.getBroadcastId());
        simpMessagingTemplate.convertAndSend("/sub/chat/"+chatDto.getBroadcastId(),chatDto);
    }
}
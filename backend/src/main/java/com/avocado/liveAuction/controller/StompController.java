package com.avocado.liveAuction.controller;

import com.avocado.liveAuction.controller.dto.AuctionOnAndOffDto;
import com.avocado.liveAuction.controller.dto.BidDto;
import com.avocado.liveAuction.domain.entity.LiveAuction;
import com.avocado.liveAuction.service.BidService;
import com.avocado.liveAuction.service.LiveAuctionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
@RequiredArgsConstructor
@Slf4j
public class StompController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final LiveAuctionService liveAuctionService;
    private final BidService bidService;

    //---관리자 기능---

    //경매 시작, 종료
    @MessageMapping(value = "/auction/status")
    public void auctionOnAndOff(AuctionOnAndOffDto auctionOnAndOffDto) {
        Integer status = auctionOnAndOffDto.getOnAndOff();
        if(status == 1) {
            //경매시작
            LiveAuction liveAuction = liveAuctionService.liveAuctionBegin(auctionOnAndOffDto.getAuctionId());
            if(!Objects.isNull(liveAuction)) {
                auctionOnAndOffDto.setTitle(liveAuction.getTitle());
                simpMessagingTemplate.convertAndSend("/sub/auction/status/"+auctionOnAndOffDto.getBroadcastId(),auctionOnAndOffDto);
            }
        }
        else if(status == 2) {
            //경매 종료
            LiveAuction liveAuction = liveAuctionService.liveAuctionStop(auctionOnAndOffDto.getAuctionId());
            if(!Objects.isNull(liveAuction)) {
                auctionOnAndOffDto.setTitle(liveAuction.getTitle());
                auctionOnAndOffDto.setSuccess_member_email(liveAuction.getEmail());
                auctionOnAndOffDto.setSuccess_price(liveAuction.getSuccessPrice());
                simpMessagingTemplate.convertAndSend("/sub/auction/status/"+auctionOnAndOffDto.getBroadcastId(),auctionOnAndOffDto);
            }
        }
    }

    //방송종료

    //---사용자---
    //입찰

    @MessageMapping("/auction/bid")
    public void bid(BidDto bidRequestDto) {
        //TODO :클라이언트에서 받은 email과 실제인증 유저의 email이 같은지 검증할 필요가 있음

        if(bidService.bid(bidRequestDto.getAuctionId(),bidRequestDto.getBid_price(), bidRequestDto.getBidMemberEmail())) {
            bidRequestDto.setStatus(true); //입찰 성공
        }
        else bidRequestDto.setStatus(false); //입찰 실패
        simpMessagingTemplate.convertAndSend("/sub/auction/bid/"+bidRequestDto.getBroadcastId(),bidRequestDto);
    }


    //---공통---

    //채팅
}

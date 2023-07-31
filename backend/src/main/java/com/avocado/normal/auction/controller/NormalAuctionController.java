package com.avocado.normal.auction.controller;


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


@RestController
@RequiredArgsConstructor
@Slf4j
public class NormalAuctionController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NormalAuctionService normalAuctionService;
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

}
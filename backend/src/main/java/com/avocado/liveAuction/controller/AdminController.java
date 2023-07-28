package com.avocado.liveAuction.controller;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.domain.repository.LiveAuctionHistoryRepository;
import com.avocado.liveAuction.service.LiveAuctionHistoryService;
import com.avocado.liveAuction.service.LiveAuctionService;
import com.avocado.liveAuction.service.TBroadcastService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Slf4j
public class AdminController {

    private final TBroadcastService tBroadcastService;
    private final LiveAuctionService liveAuctionService;
    private final LiveAuctionHistoryService liveAuctionHistoryService;

    @GetMapping("/broadcasts")
    public ResponseEntity<?> findAllBroadcasts() {
        return ResponseEntity.ok().body(tBroadcastService.findAll());
    }

    @PutMapping("/broadcast/status/on/{id}")
    public ResponseEntity<?> broadcastOn(@PathVariable Long id) {
        if(tBroadcastService.broadcastOnAndOff(id, true)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/broadcast/status/off/{id}")
    public ResponseEntity<?> broadcastOff(@PathVariable Long id) {
        if(tBroadcastService.broadcastOnAndOff(id, false)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/auction/status/begin/{id}")
    public ResponseEntity<?> liveAuctionBegin(@PathVariable Long id) {
        if (liveAuctionService.liveAuctionBegin(id)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/auction/status/stop/{id}")
    public ResponseEntity<?> liveAuctionStop(@PathVariable Long id) {
        //경매 상태->종료 입찰있을 시 낙찰자,낙찰가 업데이트
        log.info("[AdminController liveauctionStop]");
        if(liveAuctionService.liveAuctionStop(id)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/auctions/{id}")
    public ResponseEntity<?> findAllAuctionsByBraodcastId(@PathVariable Long id) {
        return ResponseEntity.ok().body(
                liveAuctionService.findAllByBroadcastId(id).stream()
                        .map(liveAuction -> AuctionsResponseDto.builder()
                                .id(liveAuction.getId())
                                .title(liveAuction.getTitle())
                                .status(liveAuction.getStatus())
                                .start_price(liveAuction.getStartPrice())
                                .success_member(liveAuction.getEmail())
                                .success_price(liveAuction.getSuccessPrice())
                                .current_bid_price(liveAuction.getCurrentPrice())
                                .build()));
    }


}

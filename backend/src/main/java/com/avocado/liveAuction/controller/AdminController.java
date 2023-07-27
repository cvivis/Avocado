package com.avocado.liveAuction.controller;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.domain.repository.LiveAuctionHistoryRepository;
import com.avocado.liveAuction.service.LiveAuctionHistoryService;
import com.avocado.liveAuction.service.LiveAuctionService;
import com.avocado.liveAuction.service.TBroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final TBroadcastService tBroadcastService;
    private final LiveAuctionService liveAuctionService;
    private final LiveAuctionHistoryService liveAuctionHistoryService;

    @GetMapping("/broadcasts")
    public ResponseEntity<?> findAllBroadcasts() {
        return ResponseEntity.ok().body(tBroadcastService.findAll());
    }

    @GetMapping("/broadcast/status/on/{id}")
    public ResponseEntity<?> broadcastOn(@PathVariable Long id) {
        if(tBroadcastService.broadcastOnAndOff(id, true)) return ResponseEntity.ok().build();
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
                                .current_bid_price(liveAuctionHistoryService.highestBidPrice(liveAuction.getId()))
                                .build()));
    }
}

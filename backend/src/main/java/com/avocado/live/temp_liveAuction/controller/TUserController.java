package com.avocado.live.temp_liveAuction.controller;

import com.avocado.live.temp_liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.live.temp_liveAuction.service.TLiveAuctionService;
import com.avocado.live.temp_liveAuction.service.TBroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class TUserController {

    private final TBroadcastService tBroadcastService;
    private final TLiveAuctionService liveAuctionService;

    @GetMapping("/broadcasts")
    public ResponseEntity<?> findAllBroadcasts() {
        return ResponseEntity.ok().body(tBroadcastService.findAll());
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
                                .success_price(liveAuction.getSuccessPrice())
                                .success_member(liveAuction.getEmail())
                                .build()));
    }


}

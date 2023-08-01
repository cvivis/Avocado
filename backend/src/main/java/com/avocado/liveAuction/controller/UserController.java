package com.avocado.liveAuction.controller;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.service.BidService;
import com.avocado.liveAuction.service.LiveAuctionHistoryService;
import com.avocado.liveAuction.service.LiveAuctionService;
import com.avocado.liveAuction.service.TBroadcastService;
import com.avocado.member.service.AuthService;
import com.avocado.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final TBroadcastService tBroadcastService;
    private final LiveAuctionService liveAuctionService;

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

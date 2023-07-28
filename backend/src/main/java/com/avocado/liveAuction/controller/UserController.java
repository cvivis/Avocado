package com.avocado.liveAuction.controller;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.controller.dto.BidRequestDto;
import com.avocado.liveAuction.service.BidService;
import com.avocado.liveAuction.service.LiveAuctionHistoryService;
import com.avocado.liveAuction.service.LiveAuctionService;
import com.avocado.liveAuction.service.TBroadcastService;
import com.avocado.member.domain.entity.Member;
import com.avocado.member.service.AuthService;
import com.avocado.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final TBroadcastService tBroadcastService;
    private final LiveAuctionService liveAuctionService;
    private final LiveAuctionHistoryService liveAuctionHistoryService;
    private final AuthService authService;
    private final BidService bidService;
    private final MemberService memberService;
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
                                .current_bid_price(liveAuction.getCurrentPrice())
                                .current_member(liveAuctionHistoryService.highestBidMemberEmail(liveAuction.getId()))
                                .build()));
    }

    @PostMapping("/acution/bid")
    public ResponseEntity<?> bidAuction(@RequestBody BidRequestDto bidRequestDto,
                                        @RequestHeader("Authorization") String requestAccessToken) {
        log.info("[UserController bidAuction] before method begin! bidRequestDto: {}, accessToken: {}",bidRequestDto,requestAccessToken);

        //토큰 payload의 email을 변조했을 가능성 차단
        String accessToken = authService.resolveToken(requestAccessToken);
//        if(!authService.validate(accessToken)) return ResponseEntity.badRequest().build();
//        log.info("[UserController bidAuction] after validating token!");


        String email = authService.getPrincipal(accessToken);
        log.info("[UserController bidAuction] after getting principal! email : {}",email);
        if(bidService.bid(bidRequestDto.getAuctionId(), bidRequestDto.getBid_price(), email)) return ResponseEntity.ok().build();
        log.info("[UserController bidAuction] after bidService.bid()!");
        return ResponseEntity.badRequest().build();
    }
}

package com.avocado.liveAuction.controller;

import com.avocado.live.domain.Broadcast;
import com.avocado.liveAuction.controller.dto.AuctionResponseDto;
import com.avocado.liveAuction.controller.dto.BidReqeustDto;
import com.avocado.liveAuction.controller.dto.BidResponseDto;
import com.avocado.liveAuction.domain.entity.TempBroadCast;
import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import com.avocado.liveAuction.domain.entity.TempLiveAuctionHistory;
import com.avocado.liveAuction.service.TempBroadcastService;
import com.avocado.liveAuction.service.TempLiveAuctionService;
import com.avocado.liveAuction.service.TempLiveBidService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/temp")
@Slf4j
public class TempController {

    private final TempBroadcastService tempBroadcastService;
    private final TempLiveAuctionService tempLiveAuctionService;

    private final TempLiveBidService tempLiveBidService;


    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok().build();
    }
    @GetMapping("/broadcasts")
    public ResponseEntity<?> broadcastList() {
        List<TempBroadCast> broadCastList = tempBroadcastService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(broadCastList.toArray());
    }

    @GetMapping("/auctions/{id}")
    public ResponseEntity<?> auctions(@PathVariable Long id) {
        tempBroadcastService.broadcastOnAndOff(id, true);
        return ResponseEntity.status(HttpStatus.OK).body(tempLiveAuctionService.findAllByBroadcast(id));
    }

    @GetMapping("/auctions/end/{id}")
    public ResponseEntity<?> broadcastEnd(@PathVariable Long id) {
        tempBroadcastService.broadcastOnAndOff(id, false);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/auctions/begin/{id}")
    public ResponseEntity<?> auctionStart(@PathVariable Long id) {
        tempLiveAuctionService.liveAuctionOnAndOff(id, true);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/auctions/stop/{id}")
    public ResponseEntity<?> auctionStop(@PathVariable Long id) {
        tempLiveAuctionService.liveAuctionOnAndOff(id, false);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/auctions/bid")
    public ResponseEntity<?> bid(@RequestBody BidReqeustDto bidReqeustDto) {
       log.info("[TempController bid] requstdto : {}", bidReqeustDto);
       //거래내역에서 사용자아이디와 경매아이디를 기준으로 찾아보고 없으면 insert
        TempLiveAuctionHistory tempLiveAuctionHistory = tempLiveBidService.bid(bidReqeustDto.getEmail(), bidReqeustDto.getAuctionId(), bidReqeustDto.getBid_price());
        if(Objects.isNull(tempLiveAuctionHistory)) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.OK).body(BidResponseDto.builder()
                .bid_price(tempLiveAuctionHistory.getBid_price())
                        .email(tempLiveAuctionHistory.getMember().getEmail())
                .build()
        );
    }
 }

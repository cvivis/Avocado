package com.avocado.liveAuction.controller;

import com.avocado.live.domain.Broadcast;
import com.avocado.liveAuction.controller.dto.AuctionResponseDto;
import com.avocado.liveAuction.domain.entity.TempBroadCast;
import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import com.avocado.liveAuction.service.TempBroadcastService;
import com.avocado.liveAuction.service.TempLiveAuctionService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/temp")
@Slf4j
public class TempController {

    private final TempBroadcastService tempBroadcastService;
    private final TempLiveAuctionService tempLiveAuctionService;


    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok().build();
    }
    @GetMapping("/broadcasts")
    public ResponseEntity<?> broadcastList() {
        List<TempBroadCast> broadCastList = tempBroadcastService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(broadCastList.toArray());
    }

    @GetMapping("/auctions")
    public ResponseEntity<?> auctions() {
//        tempLiveAuctionService.findAll()
//                .stream().map(entity -> AuctionResponseDto.builder()
//                        .id(entity.getId())
//                        .title(entity.getTitle())
//                        .start_price(entity.getStart_price())
//                        .highest_price(entity.getHighest_price())
//                        .bid_useremail(entity.getBid_useremail())
//                        .status(entity.getStatus())
//                        .broadcastId(entity.getBroadCast().getId())
//                        .build()).collect(Collectors.toList()).toArray()
        return ResponseEntity.status(HttpStatus.OK).body(tempLiveAuctionService.findAll().toArray());
    }
 }

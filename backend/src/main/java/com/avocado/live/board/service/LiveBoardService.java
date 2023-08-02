package com.avocado.live.board.service;


import com.avocado.live.board.controller.dto.LiveAuctionResponseDto;
import com.avocado.live.board.controller.dto.LiveAuctionResponseEntryDto;
import com.avocado.live.board.controller.dto.BroadcastResponseDto;
import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
import com.avocado.live.board.domain.entity.LiveAuction;
import com.avocado.live.board.domain.repository.LiveAuctionRepository;
import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.live.broadcast.domain.BroadcastRepository;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LiveBoardService {
    private final BroadcastRepository broadcastRepository;

    private final LiveAuctionRepository liveAuctionRepository;

    //라이브 방송 리스트 반환
    public BroadcastResponseDto getBroadcastList(){

        List<Broadcast> broadcastList= broadcastRepository.findAll();
        if(Collections.isEmpty(broadcastList)){return null;}
        BroadcastResponseDto broadcastResponseDto= new  BroadcastResponseDto (broadcastList.stream().map(broadcast -> BroadcastResponseEntryDto.builder()
               .id(broadcast.getId())
               .title(broadcast.getTitle())
               .link(broadcast.getLink())
               .status(broadcast.getStatus())
               .startAt(broadcast.getStartAt()).build()).collect(Collectors.toList()));
        return broadcastResponseDto;
    }

    //라이브 방송 경매 리스트 반환
    public LiveAuctionResponseDto getLiveAuctionsByBroadcastId(Long broadcastId){

            List<LiveAuction> liveAuctionList = liveAuctionRepository.findByBroadcast_Id(broadcastId).orElse(null);
            if(Collections.isEmpty(liveAuctionList))return null;

            LiveAuctionResponseDto liveAuctionResponseDto = new LiveAuctionResponseDto (liveAuctionList.stream().map(liveAuction -> LiveAuctionResponseEntryDto.builder()
                    .auctionId(liveAuction.getId())
                    .name(liveAuction.getItem().getName())
                    .hopePrice(liveAuction.getItem().getHopePrice())
                    .category(liveAuction.getItem().getCategory())
                    .instantPrice(liveAuction.getItem().getInstantPrice())
                    .status(liveAuction.getStatus())
                    .build()).collect(Collectors.toList()));
        return liveAuctionResponseDto;
    }
}

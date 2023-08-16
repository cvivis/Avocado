package com.avocado.live.board.service;


import com.avocado.live.board.controller.dto.*;
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

    //방송 id에 해당하는 경매 리스트 반환
    public LiveAuctionResponseDto getLiveAuctions(Long broadcast_id){
        List<LiveAuctionResponseEntryDto> liveAuctionResponseEntryDtos = liveAuctionRepository.findLiveAuctionByBroadcastId(broadcast_id);
        LiveAuctionResponseDto  liveAuctionResponseDto = new LiveAuctionResponseDto(liveAuctionResponseEntryDtos);
        return liveAuctionResponseDto;
    }


    //방송 중인 경매 리스트
//    public BroadcastLiveAuctionResponseDto getBroadcastAuctionsList(Long broacast_id){
//        List<BroadcastLiveAuctionResponseEntryDto> broadcastLiveAuctionResponseEntryDtos = liveAuctionRepository.findBroadcastLiveAuctionsById(broacast_id);
//        BroadcastLiveAuctionResponseDto broadcastLiveAuctionResponseDto = new BroadcastLiveAuctionResponseDto(broadcastLiveAuctionResponseEntryDtos);
//        return broadcastLiveAuctionResponseDto;
//    }

    public BroadcastLiveAuctionResponseDto getLiveAuctionListByBroadcastId(Long broadcastId) {
        List<LiveAuction> liveAuctionList = liveAuctionRepository.findByBroadcast_Id(broadcastId).orElse(null);
        if(Collections.isEmpty(liveAuctionList)) return null;
        return new BroadcastLiveAuctionResponseDto(liveAuctionList.stream().map(
                liveAuction -> BroadcastLiveAuctionResponseEntryDto.builder()
                        .auctionId(liveAuction.getId())
                        .highestPrice(liveAuction.getSuccessPrice())
                        .itemName(liveAuction.getItem().getName())
                        .startPrice(liveAuction.getItem().getHopePrice())
                        .currentMemberEmail(liveAuction.getEmail())
                        .status(liveAuction.getStatus()).build()
        ).collect(Collectors.toList()));
    }

}

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

    public LiveAuctionResponseDto getLiveAuctions(Long broadcast_id){
        List<LiveAuctionResponseEntryDto> liveAuctionResponseEntryDtos = liveAuctionRepository.findLiveAuctionByBroadcastId(broadcast_id);
        LiveAuctionResponseDto  liveAuctionResponseDto = new LiveAuctionResponseDto(liveAuctionResponseEntryDtos);
        return liveAuctionResponseDto;
    }


}

package com.avocado.live.board.service;

//import com.avocado.live.board.controller.dto.BroadcastItemResponseDto;
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


    //방송 편성 리스트 보기 추후 추가

    //방송 편성 상세 보기 추후 추가



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
                    .itemId(liveAuction.getId())
                    .name(liveAuction.getItem().getName())
                    .hopePrice(liveAuction.getItem().getHopePrice())
                    .category(liveAuction.getItem().getCategory())
                    .instantPrice(liveAuction.getItem().getInstantPrice())
                    .build()).collect(Collectors.toList()));
        return liveAuctionResponseDto;
    }



    //검색 리스트 반환

//    public BroadcastResponseDto getLiveSearchList(String keyword){
//        String keywordWildcard = "%" +keyword +"%d";
//        List<BroadcastResponseEntryDto> broadcastResponseEntryDtos = liveBoardRepository.findByLiveItemNameContains(keywordWildcard);
//        BroadcastResponseDto broadcastResponseDto = new BroadcastResponseDto(broadcastResponseEntryDtos);
//        return broadcastResponseDto;
//    }
//
//
//    //물건 상세 보기
//    public BroadcastItemResponseEntryDto getLiveItemDetail(Long id){ return liveBoardRepository.findLiveDetailById(id);}




}

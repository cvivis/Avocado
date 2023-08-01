package com.avocado.live.board.service;

//import com.avocado.live.board.controller.dto.BroadcastItemResponseDto;
import com.avocado.live.board.controller.dto.BroadcastItemResponseDto;
import com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto;
import com.avocado.live.board.controller.dto.BroadcastResponseDto;
import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
import com.avocado.live.board.domain.entity.LiveAuction;
import com.avocado.live.board.domain.repository.BroadcastRepository;
import com.avocado.live.board.domain.repository.LiveAuctionRepository;
import com.avocado.live.board.domain.repository.LiveBoardRepository;
import com.avocado.live.broadcast.domain.Broadcast;
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
               .id(broadcast.getBroadcastId())
               .title(broadcast.getTitle())
               .link(broadcast.getLink())
               .status(broadcast.getStatus())
               .startAt(broadcast.getStartAt()).build()).collect(Collectors.toList()));
        return broadcastResponseDto;
    }

    public BroadcastItemResponseDto getLiveAuctionsByBroadcastId(Long broadcastId){
            List<LiveAuction> liveAuctionList = liveAuctionRepository.findByBroadcast_Id(broadcastId).orElse(null);
            if(Collections.isEmpty(liveAuctionList))return null;
            BroadcastItemResponseDto broadcastItemResponseDto = new BroadcastItemResponseDto(liveAuctionList.stream().map(liveAuction -> BroadcastItemResponseEntryDto.builder()
                    .itemId(liveAuction.getItem().getId()).instantPrice(liveAuction.getItem().getInstantPrice()).hopePrice(liveAuction.getItem().getHopePrice())
                    .name(liveAuction.getItem().getName()).
            )

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

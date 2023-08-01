package com.avocado.live.board.service;

//import com.avocado.live.board.controller.dto.BroadcastItemResponseDto;
import com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto;
import com.avocado.live.board.controller.dto.BroadcastResponseDto;
import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
import com.avocado.live.board.domain.repository.LiveBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveBoardService {
    private final LiveBoardRepository liveBoardRepository;


    //방송 편성 리스트 보기 추후 추가

    //방송 편성 상세 보기 추후 추가



    //라이브 방송 경매 리스트 반환
    public BroadcastResponseDto getLiveList(){
        List<BroadcastResponseEntryDto> broadcastResponseEntryDtos= liveBoardRepository.findAllLiveItemList();
        BroadcastResponseDto broadcastResponseDto=new BroadcastResponseDto(broadcastResponseEntryDtos);
        return broadcastResponseDto;
    }


    //검색 리스트 반환

    public BroadcastResponseDto getLiveSearchList(String keyword){
        String keywordWildcard = "%" +keyword +"%d";
        List<BroadcastResponseEntryDto> broadcastResponseEntryDtos = liveBoardRepository.findByLiveItemNameContains(keywordWildcard);
        BroadcastResponseDto broadcastResponseDto = new BroadcastResponseDto(broadcastResponseEntryDtos);
        return broadcastResponseDto;
    }


    //물건 상세 보기
    public BroadcastItemResponseEntryDto getLiveItemDetail(Long id){ return liveBoardRepository.findLiveDetailById(id);}




}

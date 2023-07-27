package com.avocado.normal.board.service;

import com.avocado.normal.board.controller.dto.NormalResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseEntryDto;
import com.avocado.normal.board.domain.entity.NormalHistory;
import com.avocado.normal.board.domain.repository.NormalBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NormalBoardService {

    // entity를 dto 변환



    private final NormalBoardRepository normalBoardRepository;

    // 전체 리스트 반환
    public NormalResponseDto getList(){
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findAllBy();
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

    // 상세보기
//    public Optional<NormalHistory> getDetailItem(Long id){
//        return normalBoardRepository.findByItem_Id(id);
//
//    }
//
//    // 카테고리 같은거 보기
//    public Optional<List<NormalHistory>> getCategoryItem(String category){
//       return normalBoardRepository.findByCategoryEquals(category);
//
//
//    }

    // 검색
//    public Optional<List<Item>> getSearchList(String keyword){
//        return normalBoardRepository.findByNameContains(keyword);
//    }

}

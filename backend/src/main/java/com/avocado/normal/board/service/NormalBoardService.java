package com.avocado.normal.board.service;

import com.avocado.Item.domain.entity.Category;
import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseEntryDto;
import com.avocado.normal.board.domain.repository.NormalBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NormalBoardService {

    private final NormalBoardRepository normalBoardRepository;

    // 전체 리스트 반환
    public NormalResponseDto getList(){
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findAllItemList();
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

    // 검색 리스트 반환
    public NormalResponseDto getSearchList(String keyword){
        String keywordWithWildcard = "%" + keyword + "%";
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findByItemNameContains(keywordWithWildcard);
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

    // 상세보기
    public NormalItemDetailResponseDto getItemDetail(Long id) {
        return normalBoardRepository.findDetailById(id);
    }

    // 카테고리 리스트 보기
    public NormalResponseDto getCategoryList(Category category){
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findAllByCategoryEquals(category);
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

}

package com.avocado.normal.board.service;

import com.avocado.Item.domain.entity.Category;
import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import com.avocado.normal.auction.service.NormalAuctionService;
import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import com.avocado.normal.board.controller.dto.NormalItemInfoDto;
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
    private final NormalAuctionService normalAuctionService;

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
    public NormalItemInfoDto  getItemDetail(Long id) {
        NormalItemDetailResponseDto item = normalBoardRepository.findDetailById(id);
       NormalBidResponseDto topBid = normalAuctionService.topBidInfo(id);
        return NormalItemInfoDto.builder()
                .itemId(id)
                .email(topBid.getEmail())
                .name(item.getName())
                .price(topBid.getPrice())
                .lastBidAt(topBid.getLastBidAt())
                .auctionId(item.getAuctionId())
                .content(item.getContent())
                .startAt(item.getStartAt())
                .endAt(item.getEndAt())
                .historyId(topBid.getId())
                .hopePrice(item.getHopePrice())
                .successPrice(item.getSuccessPrice())
                .build();
    }

    // 카테고리 리스트 보기
    public NormalResponseDto getCategoryList(Category category){
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findAllByCategoryEquals(category);
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

}

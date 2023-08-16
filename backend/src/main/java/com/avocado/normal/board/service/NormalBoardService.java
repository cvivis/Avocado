package com.avocado.normal.board.service;

import com.avocado.Item.domain.entity.Category;
import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import com.avocado.normal.auction.domain.repository.NormalAuctionRepository;
import com.avocado.normal.auction.domain.repository.NormalHistoryRepository;
import com.avocado.normal.auction.service.NormalAuctionService;
import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import com.avocado.normal.board.controller.dto.NormalItemInfoDto;
import com.avocado.normal.board.controller.dto.NormalResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseEntryDto;
import com.avocado.normal.board.domain.repository.NormalBoardRepository;
import com.avocado.normal.entity.NormalAuction;
import com.avocado.normal.entity.NormalHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NormalBoardService {

    private final NormalBoardRepository normalBoardRepository;
    private final NormalAuctionService normalAuctionService;
    private final NormalHistoryRepository normalHistoryRepository;
    private final NormalAuctionRepository normalAuctionRepository;

    // 전체 리스트 반환
    public NormalResponseDto getList() {
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findAllItemList();
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

    // 검색 리스트 반환
    public NormalResponseDto getSearchList(String keyword) {
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
    public NormalItemDetailResponseDto  getItemRealDetail(Long id) { //itemid
        NormalAuction normalAuction = normalAuctionRepository.findByItem_Id(id).orElse(null);
        //일단 널일수 없으니까 예외 생략

        List<NormalHistory> normalHistoryList = normalHistoryRepository.findByNormalAuction_Id(normalAuction.getId()).orElse(null);
        Integer price = -1;
        if(!CollectionUtils.isEmpty(normalHistoryList)) {
            price = normalHistoryList.stream().mapToInt(normalHistory -> normalHistory.getBidPrice()).max().orElse(-1);
        }
        if(price == -1) price = null;
//        NormalItemDetailResponseDto item = normalBoardRepository.findDetailById(id);
        return NormalItemDetailResponseDto.builder()
                .itemId(id)
                .auctionId(normalAuction.getId())
                .name(normalAuction.getItem().getName())
                .content(normalAuction.getItem().getContent())
                .hopePrice(normalAuction.getItem().getHopePrice())
                .successPrice(price)
                .startAt(normalAuction.getStartAt())
                .endAt(normalAuction.getEndAt()).build();

    }

    // 카테고리 리스트 보기
    public NormalResponseDto getCategoryList(Category category) {
        List<NormalResponseEntryDto> normalResponseEntryDtos = normalBoardRepository.findAllByCategoryEquals(category);
        NormalResponseDto normalResponseDto = new NormalResponseDto(normalResponseEntryDtos);
        return normalResponseDto;
    }

}

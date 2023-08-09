package com.avocado.admin.service;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import com.avocado.Item.domain.repository.ItemRepository;
import com.avocado.admin.controller.dto.normal.*;
import com.avocado.normal.auction.domain.repository.NormalAuctionRepository;
import com.avocado.normal.entity.NormalAuction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NormalManageService {
    private final ItemRepository itemRepository;
    private final NormalAuctionRepository normalAuctionRepository;

    //상시인 승인 상품 목록 조회하기
    public NormalItemApproveResponse getNormalApproveList(){
        List<Item> approvedNormalItems = itemRepository.findByItemStatusAndType(ItemStatus.APPROVE, Type.NORMAL).orElse(null);
        if(CollectionUtils.isEmpty(approvedNormalItems)) return null;
        return new NormalItemApproveResponse(approvedNormalItems.stream().map(
                item -> NormalItemApproveResponseEntry.builder()
                        .ItemId(item.getId())
                        .memberId(item.getMember().getId())
                        .name(item.getName())
                        .hopePrice(item.getHopePrice())
                        .category(item.getCategory())
                        .content(item.getContent()).build()
        ).collect(Collectors.toList()));
    }

    //승인 -> 배정, 상시 경매 상품 등록하기
    public boolean AssignNormalApproveItem(Long id, NormalItemAssignRequest normalItemAssignRequest){
        try{
            Item findItem = itemRepository.findById(id).orElse(null);
            if(findItem.getItemStatus().equals(ItemStatus.ASSIGN)) return false;
            findItem.setItemStatus(ItemStatus.ASSIGN);
            itemRepository.save(findItem);
            NormalAuction entity = NormalAuction.builder()
                    .item(findItem)
                    .startAt(Timestamp.valueOf(normalItemAssignRequest.getStartAt()))
                    .endAt(Timestamp.valueOf(normalItemAssignRequest.getEndAt()))
                    .build();

            normalAuctionRepository.save(entity);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    //상시인 배정 상품 목록 조회하기
    public NormalItemAssignResponse getNormalAssignList(){
        List<NormalItemAssignResponseEntry> findItem = itemRepository.findByItemAssignAndType(ItemStatus.ASSIGN,Type.NORMAL);
        return NormalItemAssignResponse.builder()
                .entries(findItem)
                .build();
    }
}

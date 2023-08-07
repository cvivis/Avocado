package com.avocado.admin.service;

import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import com.avocado.Item.domain.repository.ItemRepository;
import com.avocado.admin.controller.dto.normal.*;
import com.avocado.normal.auction.domain.repository.NormalAuctionRepository;
import com.avocado.normal.entity.NormalAuction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NormalManageService {
    private final ItemRepository itemRepository;
    private final NormalAuctionRepository normalAuctionRepository;

    //상시인 승인 상품 목록 조회하기
    public NormalItemApproveResponse getNormalApproveList(){
        List<NormalItemApproveResponseEntry> findItem = itemRepository.findByItemApproveAndType(ItemStatus.APPROVE, Type.NORMAL);
        NormalItemApproveResponse response = NormalItemApproveResponse.builder()
                .entries(findItem)
                .build();
        return response;
    }


    //승인 -> 배정, 상시 경매 상품 등록하기
    public boolean AssignNormalApproveItem(Long id, NormalItemAssignRequest normalItemAssignRequest){
        try{
            Item findItem = itemRepository.findById(id).orElse(null);
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

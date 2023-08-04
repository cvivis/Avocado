package com.avocado.admin.service;

import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.repository.ItemRepository;
import com.avocado.admin.controller.dto.consign.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConsignManageService {

    private final ItemRepository itemRepository;

    // consign 상태의 상품 가져오기
    public ConsignItemResponse getConsignList(){
        List<ConsignItemResponseEntry> list = itemRepository.findByItemStatus(ItemStatus.CONSIGN);
        ConsignItemResponse response = new ConsignItemResponse(list);
        return response;
    }

    // consign 상태의 상품 상세 보기 이게 필요한가
    public ConsignItemDetailResponse getConsignItemDetail(Long id){
        Item findItem = itemRepository.findById(id).orElse(null);
        ConsignItemDetailResponse response = ConsignItemDetailResponse.builder()
                .id(findItem.getId())
                .memberId(findItem.getMember().getId())
                .name(findItem.getName())
                .content(findItem.getContent())
                .hopePrice(findItem.getHopePrice())
                .auctionType(findItem.getType())
                .build();
        log.info(response.toString());
        return response;
    }

    // 요청 상태 승인으로 바꾸고 카테고리를 설정한다.
    @Transactional
    public ConsignConfirmResponse consignApprove(ConsignConfirmRequest consignConfirmRequest){
        log.info("consign: {} " , consignConfirmRequest.toString());
        Item findItem = itemRepository.findById(consignConfirmRequest.getId()).orElse(null);
        findItem.setCategory(consignConfirmRequest.getCategory());
        findItem.setItemStatus(ItemStatus.APPROVE);
        return ConsignConfirmResponse.builder()
                .category(findItem.getCategory())
                .itemStatus(findItem.getItemStatus())
                .id(findItem.getId())
                .build();
    }

    // 요청 상태 반려로 바꾸기
    @Transactional
    public ConsignRejectResponse consignReject(Long id){
        Item findItem = itemRepository.findById(id).orElse(null);
        findItem.setItemStatus(ItemStatus.REJECT);
        return  ConsignRejectResponse.builder()
                .id(findItem.getId())
                .itemStatus(findItem.getItemStatus())
                .build();
    }
}

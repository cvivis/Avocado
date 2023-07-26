package com.avocado.Item.service;

import com.avocado.Item.controller.dto.ConsignRequestDto;
import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    // 위탁 상품 등록
    //@Transactional
    public boolean registItem(ConsignRequestDto consignRequestDto) {
        try {
            itemRepository.save(Item.builder()
                    .name(consignRequestDto.getName())
                    .content(consignRequestDto.getContent())
                    .thumbnail(consignRequestDto.getThumbnail())
                    .hopePrice(consignRequestDto.getHopePrice())
                    .type(consignRequestDto.getType())
                    .itemStatus(consignRequestDto.getItemStatus())
                    .build());
            return true;
        } catch (Exception e) {

        }
        return false;
    }

}

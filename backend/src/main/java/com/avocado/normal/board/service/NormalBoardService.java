package com.avocado.normal.board.service;

import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseEntryDto;
import com.avocado.normal.board.domain.entity.Aution;
import com.avocado.normal.board.domain.entity.Category;
import com.avocado.normal.board.domain.entity.Item;
import com.avocado.normal.board.domain.repository.NormalBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NormalBoardService {

    // entity를 dto 변환



    private final NormalBoardRepository normalBoardRepository;

    // 전체 리스트 반환
    public Optional<List<Item>> getItemList(){

        return Optional.ofNullable(normalBoardRepository.findAll());
    }

    // 상세보기
    public NormalItemDetailResponseDto getDetailItem(Long id){

        Optional<Aution> aution = normalBoardRepository.findByItem_id(id);
        Optional<Item> item = normalBoardRepository.findById(id);
        NormalItemDetailResponseDto normalItemDetailResponseDto = NormalItemDetailResponseDto.builder()
                .id(item.get().getId())
                .name(item.get().getName())
                .content(item.get().getContent())
                .hopePrice(item.get().getHopePrice())
                .startAt(aution.get().getStart_at())
                .endAt(aution.get().getEnd_at())
                .build();
        //return normalBoardRepository.findById(id);
        return normalItemDetailResponseDto;
    }

    // 카테고리 같은거 보기
    public NormalResponseDto getCategoryItem(String category){
        List<NormalResponseEntryDto> entries = new ArrayList<>();
       normalBoardRepository.findByCategoryEquals(category).ifPresent(itemList ->
       {
           for(Item buildItem : itemList){
               Optional<Aution> aution = normalBoardRepository.findByItem_id(buildItem.getId());
               NormalResponseEntryDto normalResponseDto = NormalResponseEntryDto.builder()
                       .id(buildItem.getId())
                       .name(buildItem.getName())
                       .hopePrice(buildItem.getHopePrice())
                       .currentPrice(buildItem.getHopePrice())
                       .startAt(aution.get().getStart_at())
                       .endAt(aution.get().getEnd_at())
                       .build();
               entries.add(normalResponseDto);
           }
       });
        NormalResponseDto normalResponseDto = NormalResponseDto.builder()
                .entries(entries)
                .build();

       return normalResponseDto;


    }

    // 검색
//    public Optional<List<Item>> getSearchList(String keyword){
//        return normalBoardRepository.findByNameContains(keyword);
//    }

}

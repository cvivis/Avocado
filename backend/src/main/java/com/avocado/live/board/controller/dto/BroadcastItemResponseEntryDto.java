package com.avocado.live.board.controller.dto;


import com.avocado.live.board.domain.entity.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@Builder
@ToString
public class BroadcastItemResponseEntryDto {
    private Long id;
    private Long itemId;
    private String name;
    private Integer hopePrice;
    private Category category;
    private  Integer instantPrice;

    public BroadcastItemResponseEntryDto(Long id, Long itemId, String name, Integer hopePrice, Category category, Integer instantPrice ){
        this.id=id;
        this.itemId=itemId;
        this.name=name;
        this.hopePrice=hopePrice;
        this.category=category;
        this.instantPrice=instantPrice;
    }

}

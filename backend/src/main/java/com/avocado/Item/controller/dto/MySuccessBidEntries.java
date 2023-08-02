package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MySuccessBidEntries {

    private Long itemId;
    private String name;
    private Type type;
    private Category category;
    private Integer successBidPrice;

    public MySuccessBidEntries(Long itemId, String name, Type type, Category category, Integer successBidPrice) {
        this.itemId = itemId;
        this.name = name;
        this.type = type;
        this.category = category;
        this.successBidPrice = successBidPrice;
    }

}

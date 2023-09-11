package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Type;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MySuccessBidEntries {

    private Long itemId;
    private String name;
    private Type type;
    private Category category;
    private Integer successBidPrice;

    private String url;

    public MySuccessBidEntries(Long itemId, String name, Type type, Category category, Integer successBidPrice) {
        this.itemId = itemId;
        this.name = name;
        this.type = type;
        this.category = category;
        this.successBidPrice = successBidPrice;
    }

}

package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyBidResponseEntries {

    private Long itemId;
    private Long auctionId;
    private String name;
    private Type type;
    private Category category;
    private Integer currentBid;
    private Integer myBid;

    // DTO 형태로 바로 받기 위해 파라미터 사용
    public MyBidResponseEntries(Long itemId, Long auctionId, String name, Type type, Category category, Integer myBid) {
        this.itemId = itemId;
        this.auctionId = auctionId;
        this.name = name;
        this.type = type;
        this.category = category;
        this.myBid = myBid;
    }
}

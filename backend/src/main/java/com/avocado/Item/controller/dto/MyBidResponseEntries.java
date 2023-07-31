package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Type;
import com.avocado.Item.domain.repository.MyBidResponseMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyBidResponseEntries {

    private Long itemId;
    private String name;
    private Type type;
    private Category category;
    private Integer currentBid;
    private Integer myBid;

//    public MySaleResponseEntries(MyBidResponseMapping bid) {
//        itemId = bid.itemId();
//        name = bid.name();
//        type = bid.type();
//        category = bid.category();
//        currentBid = bid.currentBid();
//        myBid = bid.myBid();
//    }
}

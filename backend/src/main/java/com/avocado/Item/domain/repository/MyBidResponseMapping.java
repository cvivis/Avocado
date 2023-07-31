package com.avocado.Item.domain.repository;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Type;

public interface MyBidResponseMapping {

    Long itemId();
    String name();
    Type type();
    Category category();
    Integer currentBid();
    Integer myBid();
}

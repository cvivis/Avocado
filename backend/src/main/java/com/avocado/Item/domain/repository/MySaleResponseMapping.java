package com.avocado.Item.domain.repository;

import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;

public interface MySaleResponseMapping {

    Long itemId();
    String name();
    ItemStatus status();
    Type type();


}

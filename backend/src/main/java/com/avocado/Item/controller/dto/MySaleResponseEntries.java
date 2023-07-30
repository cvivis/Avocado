package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import com.avocado.Item.domain.repository.MySaleResponseMapping;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MySaleResponseEntries {

    private Long itemId;
    private String name;
    private ItemStatus status;
    private Type type;

    public MySaleResponseEntries(MySaleResponseMapping item) {
        itemId = item.itemId();
        name = item.name();
        status = item.status();
        type = item.type();
    }

}

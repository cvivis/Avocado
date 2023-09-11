package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MySaleResponseEntries {

    private Long itemId;
    private String name;
    private ItemStatus status;
    private Type type;

    private String url;

    public MySaleResponseEntries(Long itemId, String name, ItemStatus itemStatus, Type type) {
        this.itemId = itemId;
        this.name = name;
        this.status = itemStatus;
        this.type = type;
    }

}

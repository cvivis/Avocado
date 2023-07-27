package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MySaleResponseEntries {

    private Long itemId;
    private Long auctionId;
    private String name;
    private ItemStatus status;
    private Type type;

}

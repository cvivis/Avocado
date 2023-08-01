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
public class ConsignRequestDto {

    private Long memberId;
    private String thumbnail;
    private String name;
    private String content;
    private int hopePrice;
    private Type type;
    private ItemStatus itemStatus;

    public Item ConsignRequestDtoToEntity() {
        Item item = Item.builder()
                .name(this.name)
                .content(this.content)
                .thumbnail(this.thumbnail)
                .hopePrice(this.hopePrice)
                .type(this.type)
                .itemStatus(this.itemStatus)
                .build();
        return item;
    }
}

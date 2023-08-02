package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import com.avocado.member.domain.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConsignRequestDto {

    private Long memberId;
    private String thumbnail;
    private String name;
    private String content;
    private int hopePrice;
    private Type type;
    private ItemStatus itemStatus;

    public Item ConsignRequestDtoToEntity(Member member) {
        Item item = Item.builder()
                .member(member)
                .name(this.name)
                .content(this.content)
                .thumbnail(this.thumbnail)
                .hopePrice(this.hopePrice)
                .type(this.type)
                .itemStatus(ItemStatus.CONSIGN)
                .build();
        return item;
    }
}

package com.avocado.admin.controller.dto.live;

import com.avocado.Item.domain.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class LiveItemsResponseDto {
    private Long itemId;
    private String name;
    private Category category;
}

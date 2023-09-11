package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.ItemStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ConsignConfirmResponse {
    private Long id;
    private ItemStatus itemStatus;
    private Category category;
}

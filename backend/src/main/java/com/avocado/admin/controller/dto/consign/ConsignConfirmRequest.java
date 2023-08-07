package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.ItemStatus;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsignConfirmRequest {
    private Long id;
    private Category category;
    private String str;
}

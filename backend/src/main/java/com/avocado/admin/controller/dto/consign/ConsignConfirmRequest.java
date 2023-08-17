package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Category;
import lombok.*;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsignConfirmRequest {
    private Long id;
    private Category category;
    private String str;
}

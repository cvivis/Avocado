package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ConsignConfirmResponse {
    private Long id;
    private ItemStatus itemStatus;
    private Category category;
}

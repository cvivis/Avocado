package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.ItemStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ConsignRejectResponse {
    private Long id;
    private ItemStatus itemStatus;
}

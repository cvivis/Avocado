package com.avocado.admin.controller.dto.normal;


import com.avocado.Item.domain.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class NormalItemAssignResponseEntry {

    private Long id;
    private Long memberId;
    private String name;
    private Integer hopePrice;
    private Category category;
    private LocalDateTime createAt;
    private LocalDateTime startAt;
    private LocalDateTime endAt;

}

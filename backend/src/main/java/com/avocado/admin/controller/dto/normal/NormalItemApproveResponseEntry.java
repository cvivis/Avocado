package com.avocado.admin.controller.dto.normal;


import com.avocado.Item.domain.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Slf4j
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NormalItemApproveResponseEntry {
    private Long id;
    private Long memberId;
    private String name;
    private Integer hopePrice;
    private Category category;
    private LocalDateTime createAt;

    public NormalItemApproveResponseEntry(Long id, Long memberId, String name, Integer hopePrice, Category category, Date createAt) {
        this.id = id;
        this.memberId = memberId;
        this.name = name;
        this.hopePrice = hopePrice;
        this.category = category;
        this.createAt = new Timestamp(createAt.getTime()).toLocalDateTime();
    }
}

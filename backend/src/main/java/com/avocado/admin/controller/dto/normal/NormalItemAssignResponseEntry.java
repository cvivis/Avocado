package com.avocado.admin.controller.dto.normal;


import com.avocado.Item.domain.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

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

    public NormalItemAssignResponseEntry(Long id, Long memberId, String name, Integer hopePrice, Category category, Date createAt, Date startAt, Date endAt) {
        this.id = id;
        this.memberId = memberId;
        this.name = name;
        this.hopePrice = hopePrice;
        this.category = category;
        this.createAt = new Timestamp(createAt.getTime()).toLocalDateTime();
        this.startAt = new Timestamp(startAt.getTime()).toLocalDateTime();
        this.endAt = new Timestamp(endAt.getTime()).toLocalDateTime();
    }
}

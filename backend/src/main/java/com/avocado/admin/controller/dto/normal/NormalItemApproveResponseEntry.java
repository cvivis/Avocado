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


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NormalItemApproveResponseEntry {
    private Long ItemId;
    private Long memberId;
    private String name;
    private Integer hopePrice;
    private Category category;
    private String content;
//    private LocalDateTime createAt;


}

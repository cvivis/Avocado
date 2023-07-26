package com.avocado.normal.board.controller.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NormalResponseEntryDto {
    private Long id;
    private String name;
    private Integer hopePrice;
    private Integer currentPrice;
    private Timestamp startAt;
    private Timestamp endAt;
}

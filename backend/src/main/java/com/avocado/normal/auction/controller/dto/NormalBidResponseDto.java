package com.avocado.normal.auction.controller.dto;

import com.avocado.common.BaseTimeEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NormalBidResponseDto {
    private Long id;
    private String email;
    private Integer price;
    private LocalDateTime lastBidAt;
}

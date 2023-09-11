package com.avocado.normal.auction.controller.dto;

import com.avocado.common.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NormalBidResponseDto {
    private Long id;
    private String email;
    private Integer price;
    private LocalDateTime lastBidAt;
}

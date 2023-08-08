package com.avocado.normal.auction.controller.dto;

import com.avocado.common.BaseTimeEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class NormalBidRequestDto  {
    private Long id; // 경매 아이디
    private Integer price;
    private Long memberId; // 이메일로 수정 -> 토큰으로 가져오기
    private Long itemId; // 경매 아이디로 수정

}

package com.avocado.live.auction.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Builder
public class AuctionsResponseDto {
    private Long id;
    private String title;
    private Integer start_price;
    private Integer success_price; //경매상태(status)에 따라 현채최고입찰가 or 낙찰가
    private String success_member;
    private Integer status; //경매전:0 , 진행 중: 1, 종료: 2,  TODO : ENUM type 추가
}

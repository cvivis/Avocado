package com.avocado.liveAuction.controller.dto;

import com.avocado.member.domain.entity.Member;
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
    private Integer success_price;
    private String success_member;
    private Integer current_bid_price;
    private String current_member;
    private Integer status; //경매전:0 , 진행 중: 1, 종료: 2,  TODO : ENUM type 추가
}

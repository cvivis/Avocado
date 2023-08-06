package com.avocado.live.auction.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuctionOnAndOffDto {
    private Long auctionId;
    private Integer onAndOff; //경매상태 0:진행전 ,1: 진행 중 , 2: 진행 종료
    private Long broadcastId;
    private String title;// 삭제
    private String success_member_email; //삭제
    private Integer success_price; //삭제
}

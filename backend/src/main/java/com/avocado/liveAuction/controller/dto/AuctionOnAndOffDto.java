package com.avocado.liveAuction.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class AuctionOnAndOffDto {
    private Long auctionId;
    private Integer onAndOff; //경매상태 0:진행전 ,1: 진행 중 , 2: 진행 종료
    private Long broadcastId;
    private String title;// 경매정보, TODO: 물품테이블 정보로 대체해야함
    private String success_member_email;
    private Integer success_price;
}

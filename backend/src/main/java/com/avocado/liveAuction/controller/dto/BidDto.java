package com.avocado.liveAuction.controller.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BidDto {
    private Boolean status; // true : 입찰성공, false: 입찰실패
    private Long auctionId;
    private Integer bid_price;
    private String bidMemberEmail;
    private Long broadcastId;
}

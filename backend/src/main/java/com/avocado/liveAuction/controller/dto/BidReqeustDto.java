package com.avocado.liveAuction.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BidReqeustDto {
    private String email;
    private Long auctionId;
    private int bid_price;
}

package com.avocado.live.board.controller.dto;

import com.avocado.member.domain.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Builder
public class BroadcastLiveAuctionResponseEntryDto {

    private Long auctionId;
    private Integer status;
    private Integer startPrice;
    private Integer highestPrice;
    private String currentMemberEmail;
    private String itemName;

    public BroadcastLiveAuctionResponseEntryDto(Long auctionId,Integer status,Integer startPrice, Integer highestPrice, String currentMemberEmail,String itemName){
        this.auctionId = auctionId;
        this.status = status;
        this.startPrice =startPrice;
        this.highestPrice = highestPrice;
        this.currentMemberEmail = currentMemberEmail;
        this.itemName=itemName;
    }

}

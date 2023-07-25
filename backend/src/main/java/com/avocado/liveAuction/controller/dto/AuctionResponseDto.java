package com.avocado.liveAuction.controller.dto;

import com.avocado.liveAuction.domain.entity.TempBroadCast;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuctionResponseDto {
    private Long id;

    private String title;

    private Integer start_price;

    private Integer highest_price;

    private String bid_useremail;

    private Boolean status;

    private Long broadcastId;
}

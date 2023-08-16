package com.avocado.live.board.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@ToString
@Builder
public class BroadcastLiveAuctionResponseDto {

    List<BroadcastLiveAuctionResponseEntryDto> entries;

    public BroadcastLiveAuctionResponseDto(List<BroadcastLiveAuctionResponseEntryDto>entries){
        this.entries=entries;
    }
}

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
public class LiveAuctionResponseDto {

    private List<LiveAuctionResponseEntryDto> entries;

    public LiveAuctionResponseDto(List<LiveAuctionResponseEntryDto>entries){
        this.entries=entries;
    }
}

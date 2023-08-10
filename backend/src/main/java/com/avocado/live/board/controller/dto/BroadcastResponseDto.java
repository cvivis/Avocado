package com.avocado.live.board.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@Builder
@ToString
public class BroadcastResponseDto {

    private List<BroadcastResponseEntryDto> entries;

    public BroadcastResponseDto(List<BroadcastResponseEntryDto>entries){
        this.entries = entries;

    }
}

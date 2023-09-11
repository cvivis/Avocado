package com.avocado.normal.board.controller.dto;

import lombok.*;

import java.util.List;

@Getter
//@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NormalResponseDto {

    private List<NormalResponseEntryDto> entries;

//    private NormalResponseEntryDto normalResponseEntryDto;
//
    public NormalResponseDto(List<NormalResponseEntryDto> entries){
        this.entries = entries;
    }
}

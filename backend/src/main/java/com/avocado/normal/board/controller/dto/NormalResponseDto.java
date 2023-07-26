package com.avocado.normal.board.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NormalResponseDto {

    private List<NormalResponseEntryDto> entries;
}

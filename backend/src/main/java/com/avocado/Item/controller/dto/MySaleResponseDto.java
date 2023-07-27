package com.avocado.Item.controller.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MySaleResponseDto {
    private List<MySaleResponseEntries> entries = new ArrayList<>();
}



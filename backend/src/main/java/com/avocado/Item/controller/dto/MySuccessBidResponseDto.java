package com.avocado.Item.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MySuccessBidResponseDto {
    private List<MySuccessBidEntries> entries = new ArrayList<>();
}

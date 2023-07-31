package com.avocado.Item.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyBidResponseDto {
    // 페이지네이션 적용 대비 일급컬렉션 이용
    private List<MyBidResponseEntries> entries = new ArrayList<>();
}

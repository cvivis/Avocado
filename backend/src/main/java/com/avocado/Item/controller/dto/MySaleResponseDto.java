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
    // 페이지네이션 적용 대비 일급컬렉션 이용
    private List<MySaleResponseEntries> entries = new ArrayList<>();
}



package com.avocado.Item.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ItemStatus {

    CONSIGN("CONSIGN","위탁"),
    APPROVE("APPROVE","승인"),
    ASSIGN("ASSIGN","배정"),
    REJECT("REJECT","반려"),
    SUCCESS("SUCCESS","낙찰"),
    FAIL("FAIL","유찰");

    private final String key;
    private final String title;

}

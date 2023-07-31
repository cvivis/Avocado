package com.avocado.normal.board.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ItemStatus {

    CONSIGN("STATUS_CONSIGN","위탁"),
    APPROVE("STATUS_APPROVE","승인"),
    ASSIGN("STATUS_ASSIGN","배정"),
    REJECT("STATUS_REJECT","반려"),
    SUCCESS("STATUS_SUCCESS","낙찰"),
    FAIL("STATUS_FAIL","유찰");

    private final String key;
    private final String title;

}
package com.avocado.normal.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Type {

    NORMAL("TYPE_NORMAL", "상시"),
    LIVE("TYPE_LIVE", "라이브");

    private final String key;
    private final String title;

}
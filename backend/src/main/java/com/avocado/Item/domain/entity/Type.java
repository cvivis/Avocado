package com.avocado.Item.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Type {

    NORMAL("NORMAL", "상시"),
    LIVE("LIVE", "라이브");

    private final String key;
    private final String title;

}

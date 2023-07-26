package com.avocado.normal.board.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Category {

    ELECTRONICS("ELECTRONICS","전자기기"),
    HANDICRAFT("HANDICRAFT","수공예품"),
    PETSUPPLIES("PETSUPPLIES","애완용품"),
    CLOTHES("CLOTHES","의류");

    private final String key;
    private final String title;
}
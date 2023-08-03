package com.avocado.live.board.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum LiveAuctionStatus {

    CONSIGN(0,"경매시작전"),
    APPROVE(1,"경매진행중"),
    ASSIGN(2,"경매종료");

    private final Integer key;
    private final String title;
}

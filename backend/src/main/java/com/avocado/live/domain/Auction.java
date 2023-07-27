package com.avocado.live.domain;

import com.avocado.common.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Auction extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long itemId;

    private Long broadcastId;

    public Auction(Long itemId) {
        this.itemId = itemId;
    }

    protected Auction() {}
}

package com.avocado.liveAuction.domain.entity;

import com.avocado.common.BaseTimeEntity;
import com.avocado.member.domain.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class TempLiveAuctionHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "memberId")
    @JsonIgnore
    private Member member;

    @OneToOne
    @JoinColumn(name = "templiveauctionId")
    private TempLiveAuction tempLiveAuction;
    private Integer bid_price;
}

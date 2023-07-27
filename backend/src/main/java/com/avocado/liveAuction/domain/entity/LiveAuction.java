package com.avocado.liveAuction.domain.entity;

import com.avocado.member.domain.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
public class LiveAuction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Integer startPrice; //TODO : 물품테이블 조인으로 대체

    private Integer successPrice;

    private Integer currentPrice; // 현재 erd상에 없는 변수

    @ManyToOne
    @JoinColumn(name = "successMember")
    @JsonIgnore
    private Member member;

    private Integer status; //경매시작전:0 , 경매진행중: 1, 경매종료: 2 // TODO : ENUM type 추가

    @ManyToOne
    @JoinColumn(name = "broadcastID")
    @JsonIgnore
    private TBroadcast broadcast;

    public String getEmail() {
        if(Objects.isNull(this.member)) return null;
        return this.member.getEmail();
    }
}

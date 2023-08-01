package com.avocado.live.board.domain.entity;


import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.live.temp_liveAuction.domain.entity.TBroadcast;
import com.avocado.member.domain.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Objects;

@Entity(name= "liveAuction")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
public class LiveAuction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private String title; //TODO: 물품테이블 조인으로 대체
//    private Integer startPrice; //TODO : 물품테이블 조인으로 대체

    @OneToOne
    @JoinColumn(name="itemId")
    @JsonIgnore
    private Item item;


    private Integer successPrice; //경매종료전 : 최고입찰가, 경매종료후: 낙찰가

    @ManyToOne
    @JoinColumn(name = "successMember")
    @JsonIgnore
    private Member member; //경매종료전 : 최고입찰자, 경매종료후: 입찰자

    private Integer status; //경매시작전:0 , 경매진행중: 1, 경매종료: 2 // TODO : ENUM type 추가

    @ManyToOne
    @JoinColumn(name = "broadcastID")
    @JsonIgnore
    private Broadcast broadcast; //TODO : 방송 feature와 merge 후 교체

    public String getEmail() {
        if(Objects.isNull(this.member)) return null;
        return this.member.getEmail();
    }


}

package com.avocado.live.board.domain.entity;


import com.avocado.Item.domain.entity.Item;
import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.member.domain.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class LiveAuction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @JoinColumn(name = "broadcastId")
    @JsonIgnore
    private Broadcast broadcast;

    public String getEmail() {
        if(Objects.isNull(this.member)) return null;
        return this.member.getEmail();
    }


}

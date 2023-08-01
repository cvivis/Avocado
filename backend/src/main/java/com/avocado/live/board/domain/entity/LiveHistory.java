package com.avocado.live.board.domain.entity;


import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name= "liveHistory")
@NoArgsConstructor
@Builder
@Getter
@AllArgsConstructor
@ToString
public class LiveHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id")
    @NotNull
    private Member member;

    @Column(name="liveAuction_id")
    @NotNull
    private Long liveAuctionId;

    @NotNull
    private Integer bidPrice;

    public void setBidPrice(Integer bidPrice){
        this.bidPrice =bidPrice;
    }
}

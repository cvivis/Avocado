package com.avocado.live.board.domain.entity;


import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@Builder
@Getter
@AllArgsConstructor
@Setter
public class LiveHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="memberId")
    @NotNull
    private Member member;

    @ManyToOne
    @JoinColumn(name="liveAuctionId")
    @NotNull
    private LiveAuction liveAuction;

    @NotNull
    private Integer bidPrice;

    public void setBidPrice(Integer bidPrice){
        this.bidPrice =bidPrice;
    }
}

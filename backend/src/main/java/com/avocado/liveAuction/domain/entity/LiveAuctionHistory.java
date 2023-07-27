package com.avocado.liveAuction.domain.entity;

import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class LiveAuctionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "liveAuctionId")
    private LiveAuction liveAuction;

    private Integer bidPrice;

}

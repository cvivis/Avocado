package com.avocado.live.temp_liveAuction.domain.entity;

import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class TLiveAuctionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "liveAuctionId")
    private TLiveAuction liveAuction;

    private Integer bidPrice;

}

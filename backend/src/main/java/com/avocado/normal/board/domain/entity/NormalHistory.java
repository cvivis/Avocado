package com.avocado.normal.board.domain.entity;

import com.avocado.common.BaseTimeEntity;
import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "normalHistory")
@NoArgsConstructor
@Builder
@Getter
@AllArgsConstructor
@ToString
public class NormalHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


//    @Column(name = "member_id") // 이메일로 수정하기
//    @NotNull
//    private Long memberId;


    @ManyToOne
    @JoinColumn(name = "member_id") // 이메일로 수정하기
    @NotNull
    private Member member;

    @Column(name = "normalAuction_id")
    @NotNull
    private Long autionId;

    @NotNull
    private Integer bidPrice;


    public void setBidPrice(Integer bidPrice) {
        this.bidPrice = bidPrice;
    }
}
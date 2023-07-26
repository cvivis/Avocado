package com.avocado.normal.auction.domain.entity;

import com.avocado.common.BaseTimeEntity;
import com.avocado.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "normalHistory")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class NormalHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id") // 이메일로 수정하기
    @NotNull
    private Member member;

    @ManyToOne
    @JoinColumn(name = "normalAuction_id")
    @NotNull
    private NormalAuction normalAuction;

    @NotNull
    private Integer bidPrice;
}

package com.avocado.normal.entity;

import com.avocado.common.BaseTimeEntity;
import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "normalHistory")
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class NormalHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id") // 이메일로 수정하기
    @NotNull
    private Member member;

//    @NotNull
//    @Column(name="column" , unique=true)
//    private String email;

    @ManyToOne
    @JoinColumn(name = "normalAuction_id")
    @NotNull
    private NormalAuction normalAuction;

    @NotNull
    private Integer bidPrice;

    @Override
    public String toString() {
        return "NormalHistory{" +
                "id=" + id +
                ", member=" + member +
                ", normalAuction=" + normalAuction +
                ", bidPrice=" + bidPrice +
                '}';
    }
}

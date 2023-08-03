package com.avocado.normal.auction.domain.entity;

import com.avocado.common.BaseTimeEntity;
import com.avocado.normal.auction.domain.entity.NormalHistory;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Entity(name = "normalAuction")
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class NormalAuction extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long itemId; //item 외래키 설정 나중에

    @OneToMany(mappedBy = "normalAuction")
    private List<NormalHistory> normalHistory;


//    private Long successMember;

    private Integer successPrice;

    @NotNull
    private Timestamp startAt;

    @NotNull
    private Timestamp endAt;

    @Override
    public String toString() {
        return "NormalAuction{" +
                "id=" + id +
                ", itemId=" + itemId +
//                ", normalHistory=" + normalHistory +
                ", successPrice=" + successPrice +
                ", startAt=" + startAt +
                ", endAt=" + endAt +
                '}';
    }
}

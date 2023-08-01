package com.avocado.normal.entity;

import com.avocado.Item.domain.entity.Item;
import com.avocado.common.BaseTimeEntity;
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
public class NormalAuction extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemId") // referencedColumnName = "idx"
    private Item item;

    @OneToMany(mappedBy = "normalAuction")
    private List<NormalHistory> normalHistory;

    private Long successMember;

    private Integer successPrice;

    @NotNull
    private Timestamp startAt;

    @NotNull
    private Timestamp endAt;

    @Override
    public String toString() {
        return "NormalAuction{" +
                "id=" + id +
                ", itemId=" + item.getId() +
//                ", normalHistory=" + normalHistory +
                ", successPrice=" + successPrice +
                ", startAt=" + startAt +
                ", endAt=" + endAt +
                '}';
    }
}

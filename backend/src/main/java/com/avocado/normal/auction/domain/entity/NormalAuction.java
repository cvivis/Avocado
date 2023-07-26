package com.avocado.normal.auction.domain.entity;

import com.avocado.common.BaseTimeEntity;
import com.avocado.normal.auction.domain.entity.NormalHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Entity(name = "normalAuction")
@NoArgsConstructor
@Builder
@AllArgsConstructor

public class NormalAuction extends BaseTimeEntity {

    @Id
    private Long id;

    @NotNull
    private Long itemId; //item 외래키 설정 나중에

    @OneToMany(mappedBy = "normalAuction")
    private List<NormalHistory> normalHistory;
//    private Member successMember;

//    @
//    Member sucessMember; // 1대1
    private Integer successPrice;

    @NotNull
    private Timestamp startAt;

    @NotNull
    private Timestamp endAt;
}

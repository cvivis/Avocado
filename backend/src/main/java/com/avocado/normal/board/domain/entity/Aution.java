package com.avocado.normal.board.domain.entity;


import com.avocado.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity(name = "aution")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Aution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "success_member")
    private Member member;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @NotNull
    private Integer success_price;
    @NotNull
    private Timestamp start_at;
    @NotNull
    private Timestamp end_at;
    @NotNull
    private Timestamp created_at;
    @NotNull
    private Timestamp modified_at;


}

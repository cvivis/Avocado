package com.avocado.normal.board.domain.entity;


import com.avocado.member.domain.entity.Member;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity(name = "aution")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
public class Aution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "success_member")
    private Long successMember;


    @Column(name = "item_id")
    private Long itemId;

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

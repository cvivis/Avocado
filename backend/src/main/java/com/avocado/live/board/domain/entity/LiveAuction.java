package com.avocado.live.board.domain.entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity(name= 'liveAuction')
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
public class LiveAuction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name= "broadcast_id")
    private Long broadcatsId;

    @Column(name="item_id")
    private Long itemId;
    @NotNull
    private Long successMember;
    @NotNull
    private Integer success_price;
    @NotNull
    private Timestamp created_at;
    @NotNull
    private Timestamp modified_at;


}

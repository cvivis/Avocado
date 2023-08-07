
package com.avocado.live.board.domain.entity;

import com.avocado.member.domain.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import reactor.util.annotation.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity(name = "item")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name = "memberId")
    @JsonIgnore
    private Member member;

    @NotNull
    private String name;

    private String content;

    private String thumbnail;

    @Min(value = 0) // 최솟값 설정
    private Integer hopePrice;

    private Integer instantPrice;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private ItemStatus itemStatus;

    @Enumerated(EnumType.STRING)
    private Category category;



}
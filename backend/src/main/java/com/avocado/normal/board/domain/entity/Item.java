
package com.avocado.normal.board.domain.entity;

import com.avocado.member.domain.entity.Member;
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

    @Column(name = "memberId")
    private Long memberId;

    @NotNull
    private String name;
    private String content;
    @Nullable
    private String thumbnail;
    @Min(value = 0) // 최솟값 설정
    private int hopePrice;

    @Enumerated(EnumType.STRING)
//    @EnumValid(enumClass = Type.class)
    private Type type;
    @Enumerated(EnumType.STRING)
//    @EnumValid(enumClass = ItemStatus.class)
    private ItemStatus itemStatus;
    @Enumerated(EnumType.STRING)
//    @EnumValid(enumClass = Category.class)
    @Nullable
    private Category category;



}
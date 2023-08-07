package com.avocado.Item.domain.entity;

import com.avocado.common.BaseTimeEntity;
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
@Setter
public class Item extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
    @NotNull
    private String name;
    private String content;
    @Nullable
    private String thumbnail;
    @Min(value = 0) // 최솟값 설정
    private int hopePrice;
    // 즉시구매가 임시 스펙 아웃
    private int instantPrice;
    @Enumerated(EnumType.STRING)
    //@EnumValid(enumClass = Type.class)
    private Type type;
    @Enumerated(EnumType.STRING)
    //@EnumValid(enumClass = ItemStatus.class, ignoreCase = true)
    private ItemStatus itemStatus;
    @Enumerated(EnumType.STRING)
    //@EnumValid(enumClass = Category.class)
    private Category category;
}

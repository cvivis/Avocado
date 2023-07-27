package com.avocado.normal.board.controller.dto;

import com.avocado.normal.board.domain.entity.NormalHistory;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@NoArgsConstructor
@Builder
@ToString
public class NormalItemDetailResponseDto {
    private Long id;
    private String name;
    private String content;
    private Integer hopePrice;
//    private TopBidMemberResponse topBidMember;
    private Date startAt;
    private Date endAt;

    public NormalItemDetailResponseDto(Long id, String name, String content,
                                       Integer hopePrice, Date startAt, Date endAt) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.hopePrice = hopePrice;
        this.startAt = startAt;
        this.endAt = endAt;
    }
}

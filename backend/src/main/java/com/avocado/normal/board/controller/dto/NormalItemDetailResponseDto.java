package com.avocado.normal.board.controller.dto;

import com.avocado.normal.board.domain.entity.NormalHistory;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NormalItemDetailResponseDto {
    private Long id;
    private String name;
    private String content;
    private Integer hopePrice;
//    private TopBidMemberResponse topBidMember;
    private Timestamp startAt;
    private Timestamp endAt;

//    public NormalItemDetailResponseDto(NormalHistory normalHistory) {
//        this.id = normalHistory.getAution().getItem().getId();
//        this.name = normalHistory.getAution().getItem().getName();
//        this.content = normalHistory.getAution().getItem().getContent();
//        this.hopePrice = normalHistory.getAution().getItem().getHopePrice();
//        this.startAt = normalHistory.getAution().getStart_at();
//        this.endAt = normalHistory.getAution().getEnd_at();
//    }
}

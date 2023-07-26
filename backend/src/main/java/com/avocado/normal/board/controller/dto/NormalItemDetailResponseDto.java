package com.avocado.normal.board.controller.dto;

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
}

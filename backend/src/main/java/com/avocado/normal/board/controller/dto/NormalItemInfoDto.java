package com.avocado.normal.board.controller.dto;

import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NormalItemInfoDto {
    private Long auctionId;
    private Long itemId;
    private String name;
    private String content;
    private Integer hopePrice;
    //    private TopBidMemberResponse topBidMember;
    private Date startAt;
    private Date endAt;
    private Integer successPrice;
    private Long historyId;
    private String email;
    private Integer price;
    private LocalDateTime lastBidAt;

}

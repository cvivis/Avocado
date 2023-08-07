package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.Category;
import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@NoArgsConstructor
public class MySaleDetailResponseDto {

    private Long itemId;
    private Long auctionId;
    private String name;
    private String content;
    private Type type;
    private ItemStatus itemStatus;
    private Category category;
    private Integer currentBid;
    private Integer hopePrice;
    private Date startAt;
    private Date endAt;
    private Integer successPrice;

    // 상시 경매용
    public MySaleDetailResponseDto(Item item, NormalItemDetailResponseDto normalItemDetailResponseDto, Integer currentBid) {
        itemId = item.getId();
        auctionId = normalItemDetailResponseDto.getAuctionId(); // 추후 추가
        name = item.getName();
        content = item.getContent();
        type = item.getType();
        itemStatus = item.getItemStatus();
        category = item.getCategory();
        this.currentBid = currentBid;
        hopePrice = item.getHopePrice();
        successPrice = normalItemDetailResponseDto.getSuccessPrice(); // 추후 추가
        startAt = normalItemDetailResponseDto.getStartAt(); // 추후 추가
        endAt = normalItemDetailResponseDto.getEndAt(); // 추후 추가
    }

    // 라이브 경매용
//    public MySaleDetailResponseDto(Item item, LiveAuction liveAuction, Broadcast broadcast) {
//        itemId = item.getId();
//        auctionId = liveAuction.getAuctionId(); // 추후 추가
//        name = item.getName();
//        content = item.getContent();
//        type = item.getType();
//        itemStatus = item.getItemStatus();
//        category = item.getCategory();
//        hopePrice = item.getHopePrice();
//        successPrice = liveAuction.getSuccessPrice(); // 추후 추가
//        startAt = broadcast.getStartAt(); // 추후 추가
//    }

}

package com.avocado.normal.board.controller.dto;

import lombok.*;

import java.util.Date;

@Getter
//@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString


public class NormalResponseEntryDto {
    private Long auctionId;
    private Long itemId;
    private String name;
    private String content;
    private Integer bidPrice;
    private Integer hopePrice;
    private Date startAt;
    private Date endAt;


    public NormalResponseEntryDto(Long auctionId, Long itemId, String name, String content, Integer bidPrice, Integer hopePrice, Date startAt, Date endAt) {
        this.auctionId = auctionId;
        this.itemId = itemId;
        this.name = name;
        this.content = content;
        this.bidPrice = bidPrice;
        this.hopePrice = hopePrice;
        this.startAt = startAt;
        this.endAt = endAt;
    }

    // Getters and setters (if necessary)
}


//public class NormalResponseEntryDto {
//    private Long id;
//    private String name;
//    private Integer hopePrice;
//    private Integer currentPrice;
//    private Timestamp startAt;
//    private Timestamp endAt;
//
////     public NormalResponseEntryDto(NormalHistory normalHistory, Item item, Aution aution){
////         this.id = item.getId();
////         this.name = item.getName();
////         this.hopePrice = item.getHopePrice();
////         this.currentPrice = normalHistory.getBidPrice();
////         this.startAt = aution.getStart_at();
////         this.endAt = aution.getEnd_at();
////     }
//public NormalResponseEntryDto(Long id, String name, Integer bidPrice, Integer hopePrice, Timestamp start_at, Timestamp end_at) {
//    this.id = id;
//    this.name = name;
//    this.currentPrice = bidPrice;
//    this.hopePrice = hopePrice;
//    this.startAt = start_at;
//    this.endAt = end_at;
//}
//
//
//
//}

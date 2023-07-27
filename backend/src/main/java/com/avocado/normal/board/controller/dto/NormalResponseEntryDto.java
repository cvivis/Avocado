package com.avocado.normal.board.controller.dto;

import com.avocado.normal.board.domain.entity.Aution;
import com.avocado.normal.board.domain.entity.Item;
import com.avocado.normal.board.domain.entity.NormalHistory;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Getter
//@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString


public class NormalResponseEntryDto {
    private Long id;
    private String name;
    private Integer bidPrice;
    private Integer hopePrice;
    private Timestamp startAt;
    private Timestamp endAt;

    public NormalResponseEntryDto(Long id, String name, Integer bidPrice, Integer hopePrice, Timestamp startAt, Timestamp endAt) {
        this.id = id;
        this.name = name;
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

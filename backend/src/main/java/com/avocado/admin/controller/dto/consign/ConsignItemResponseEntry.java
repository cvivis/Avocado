package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Type;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class ConsignItemResponseEntry {
    private Long ItemId;
    private String name;
    private Type auctionType;
    private String content;
    private int hopePrice;
//    private LocalDateTime createdAt;

//    public ConsignItemResponseEntry(Long id, String name, Type auctionType, Date createdAt) {
//        this.id = id;
//        this.name = name;
//        this.auctionType = auctionType;
////        this.createdAt = new Timestamp(createdAt.getTime()).toLocalDateTime();
//    }
}

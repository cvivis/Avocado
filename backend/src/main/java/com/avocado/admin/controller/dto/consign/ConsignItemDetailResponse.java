package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Type;
import lombok.*;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class ConsignItemDetailResponse {
    private Long id;
    private Long memberId;
//    private List<String> images;
    private String name;
    private String content;
    private Integer hopePrice;
    private Type auctionType;
}

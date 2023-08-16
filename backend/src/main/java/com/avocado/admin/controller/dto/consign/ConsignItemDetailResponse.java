package com.avocado.admin.controller.dto.consign;


import com.avocado.Item.domain.entity.Type;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
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

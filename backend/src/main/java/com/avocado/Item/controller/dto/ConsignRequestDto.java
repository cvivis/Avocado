package com.avocado.Item.controller.dto;

import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConsignRequestDto {

    private Long memberId;
    private String thumbnail;
    private String name;
    private String content;
    private int hopePrice;
    private Type type;
    private ItemStatus itemStatus;
    
    // TODO : dtoToEntity 작성 및 사용을 통해 서비스 코드 가독성 올리기

}

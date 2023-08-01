package com.avocado.live.board.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@Builder
@ToString

public class BroadcastItemResponseDto {
    private Long id;
    private List<BroadcastItemResponseEntryDto> items;
    private String link;
    private Boolean status;
    private Date startAt;

    public BroadcastItemResponseDto(Long id, List<BroadcastItemResponseEntryDto> items, String  link, Boolean status, Date startAt){
        this.id=id;
        this.items=items;
        this.link=link;
        this.status=status;
        this.startAt=startAt;

    }

}

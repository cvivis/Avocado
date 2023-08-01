package com.avocado.live.board.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Getter
@NoArgsConstructor
@Builder
@ToString
public class BroadcastResponseEntryDto {
    private Long id;
    private Long itemId;
    private String title;
    private String link;
    private Boolean broadcastStatus;
    private Date startAt;

    public BroadcastResponseEntryDto(Long id,Long itemId, String title, String link, Boolean broadcastStatus, Date startAt){
        this.id=id;
        this.itemId =itemId;
        this.title =title;
        this.link=link;
        this.broadcastStatus=broadcastStatus;
        this.startAt=startAt;

    }

}

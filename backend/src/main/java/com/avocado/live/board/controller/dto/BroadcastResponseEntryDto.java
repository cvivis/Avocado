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
    private String title;
    private String link;
    private Boolean status;
    private Date startAt;

    public BroadcastResponseEntryDto(Long id, String title, String link, Boolean status, Date startAt){
        this.id=id;
        this.title =title;
        this.link=link;
        this.status=status;
        this.startAt=startAt;

    }

}

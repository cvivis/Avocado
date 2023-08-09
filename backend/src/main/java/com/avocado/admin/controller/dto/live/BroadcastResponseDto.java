package com.avocado.admin.controller.dto.live;

import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BroadcastResponseDto {
    private Long broadcastId;
    private String sessionId;
    private String title;
    private String introduce;
    private String link;
    private Boolean status;
    private Date startAt;
}

package com.avocado.admin.controller.dto.normal;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NormalItemAssignRequest {
    private LocalDateTime startAt;
    private LocalDateTime endAt;
}

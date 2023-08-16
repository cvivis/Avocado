package com.avocado.admin.controller.dto.normal;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class NormalItemAssignResponse {
    List<NormalItemAssignResponseEntry> entries = new ArrayList<>();
}

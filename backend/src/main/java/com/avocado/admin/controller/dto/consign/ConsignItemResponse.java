package com.avocado.admin.controller.dto.consign;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ConsignItemResponse {
    private List<ConsignItemResponseEntry> entries = new ArrayList<>();
}

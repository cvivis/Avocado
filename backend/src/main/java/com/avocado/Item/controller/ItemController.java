package com.avocado.Item.controller;

import com.avocado.Item.controller.dto.ConsignRequestDto;
import com.avocado.Item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    // 위탁 요청 물품 등록
    @PostMapping("/consign")
    public ResponseEntity<Void> regist(@RequestBody @Valid ConsignRequestDto consignRequestDto) {
        if (itemService.registItem(consignRequestDto)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    };

}

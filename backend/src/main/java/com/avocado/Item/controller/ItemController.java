package com.avocado.Item.controller;

import com.avocado.Item.controller.dto.ConsignRequestDto;
import com.avocado.Item.controller.dto.MySaleResponseDto;
import com.avocado.Item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    // 위탁 요청 물품 등록
    @PostMapping("/consign")
    public ResponseEntity<Void> save(@RequestBody @Valid ConsignRequestDto consignRequestDto) {
        if (itemService.saveItem(consignRequestDto)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    };

    // 나의 위탁 물품 리스트 가져오기
    @GetMapping("/mySale")
    public MySaleResponseDto findById() {
        //return itemService.find
        return null;
    }

}

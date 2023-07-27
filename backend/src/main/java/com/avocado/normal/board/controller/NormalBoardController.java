package com.avocado.normal.board.controller;

import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseDto;
import com.avocado.normal.board.domain.entity.Category;
import com.avocado.normal.board.service.NormalBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/normal")
@RequiredArgsConstructor
@Slf4j
public class NormalBoardController {
    private final NormalBoardService normalBoardService;

    // 예외 던지는데 exception 클래스는 만들지 않겠음
    @GetMapping("/list")
    public ResponseEntity<?> itemList(){
        NormalResponseDto itemlist = normalBoardService.getList();
        log.info("{}",normalBoardService.getList());
        return ResponseEntity.ok().body(itemlist);
    }

    @GetMapping("/list/search/{keyword}")
    public ResponseEntity<?> searchItemList(@PathVariable String keyword){
        NormalResponseDto itemlist = normalBoardService.getSearchList(keyword);
        log.info("{}", normalBoardService.getSearchList(keyword));
        return ResponseEntity.ok().body(itemlist);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> itemDetail(@PathVariable Long id){
        NormalItemDetailResponseDto item = normalBoardService.getItemDetail(id);
        return ResponseEntity.ok().body(item);
    }
    @GetMapping("/list/{category}")
    public ResponseEntity<?> SortCategoryList(@PathVariable Category category){
        NormalResponseDto itemlist = normalBoardService.getCategoryList(category);
        return ResponseEntity.ok().body(itemlist);
    }
}

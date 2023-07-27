package com.avocado.normal.board.controller;

import com.avocado.normal.board.controller.dto.NormalResponseDto;
//import com.avocado.normal.board.service.NormalBoardService;
//import com.avocado.normal.board.service.TempServie;
import com.avocado.normal.board.domain.entity.NormalHistory;
import com.avocado.normal.board.service.NormalBoardService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/normal")
@RequiredArgsConstructor
@Slf4j
public class NormalBoardController {
    private final NormalBoardService normalBoardService;

    @GetMapping("/list")
    public ResponseEntity<?> itemList(){
//        NormalResponseDto itemlist = normalBoardService.getList();
//        return new ResponseEntity<NormalResponseDto>(itemlist, HttpStatus.OK);
        log.info("{}",normalBoardService.getList());
        return ResponseEntity.ok().build();
    }

//    private final TempServie tempServie;

//    @GetMapping("/test")
//    public ResponseEntity<?> findALl() {
//        log.info("{}",tempServie.findALl().get(0).getMember().getEmail());
//        return ResponseEntity.ok().build();
//    }

}

package com.avocado.live.board.controller;

import com.avocado.live.board.controller.dto.BroadcastItemResponseDto;
import com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto;
import com.avocado.live.board.controller.dto.BroadcastResponseDto;
import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
import com.avocado.live.board.service.LiveBoardService;
import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
@Slf4j

public class LiveBoardController {

    private final LiveBoardService liveBoardService;

    @GetMapping("/{broadcastId}/list")
    public ResponseEntity<?> liveItemList(){
        BroadcastResponseDto liveitemlist = liveBoardService.getLiveList();
        log.info("{}",liveBoardService.getLiveList());
        return ResponseEntity.ok().body(liveitemlist);
    }

    @GetMapping("/list/search/{keyword}")
    public ResponseEntity<?> searchLiveItemList(@PathVariable String keyword){
        BroadcastResponseDto liveitemlist = liveBoardService.getLiveSearchList(keyword);
        log.info("{}",liveBoardService.getLiveSearchList(keyword));
        return ResponseEntity.ok().body(liveitemlist);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> liveItemDetail(@PathVariable Long id){
        BroadcastItemResponseEntryDto liveitem = liveBoardService.getLiveItemDetail(id);
        return ResponseEntity.ok().body(liveitem);
    }




}

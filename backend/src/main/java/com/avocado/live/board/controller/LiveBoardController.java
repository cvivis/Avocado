package com.avocado.live.board.controller;

import com.avocado.live.board.controller.dto.BroadcastResponseDto;
import com.avocado.live.board.controller.dto.LiveAuctionResponseDto;
import com.avocado.live.board.service.LiveBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class LiveBoardController {

    private final LiveBoardService liveBoardService;

    //방송 편성 리스트
    @GetMapping("/list")
    public ResponseEntity<?> broadcastList(){
        BroadcastResponseDto liveitemlist = liveBoardService.getBroadcastList();
        log.info("{}",liveBoardService.getBroadcastList());
        return ResponseEntity.ok().body(liveitemlist);
    }

    //방송 상세 경매 리스트
    @GetMapping("/list/{broadcast_id}")
    public ResponseEntity<?> searchLiveAuctionList(@PathVariable Long broadcast_id){
        LiveAuctionResponseDto liveAuctionList = liveBoardService.getLiveAuctionsByBroadcastId(broadcast_id);
        log.info("{}",liveBoardService.getLiveAuctionsByBroadcastId(broadcast_id));
        return ResponseEntity.ok().body(liveAuctionList);
    }

//    @GetMapping("/detail/{id}")
//    public ResponseEntity<?> liveItemDetail(@PathVariable Long id){
//        BroadcastItemResponseEntryDto liveitem = liveBoardService.getLiveItemDetail(id);
//        return ResponseEntity.ok().body(liveitem);
//    }




}

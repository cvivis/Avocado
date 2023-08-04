package com.avocado.live.board.controller;

import com.avocado.live.board.controller.dto.BroadcastLiveAuctionResponseDto;
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
//@CrossOrigin(origins = "http://localhost:3000")
public class LiveBoardController {

    private final LiveBoardService liveBoardService;

    //흐름
    // 1. 방송편성표에서 방송참여하기 클릭 -> 해당 방송ID 어딘가에 저장 -> 방송화면으로 이동
    // 2. 방송화면으로 이동 시, 어딘가에 저장해놓은 방송ID로 경매리스트를 불러온다
    // TODO: 방송에 해당하는 경매리스트 불러오기 (경매id, 진행상황(status), 시작가, 최고입찰자, 최고입찰가)
    // TODO : 방송 화면 진입 시 필요한 api를 auction/board 어디서 처리할지 논의 필요

    //방송 편성 리스트
    @GetMapping("/list")
    public ResponseEntity<?> broadcastList(){
        BroadcastResponseDto liveitemlist = liveBoardService.getBroadcastList();
        return ResponseEntity.ok().body(liveitemlist);
    }

    //방송 상세 경매 리스트
    @GetMapping("/list/{broadcast_id}")
    public ResponseEntity<?> searchLiveAuctionList(@PathVariable Long broadcast_id){
        LiveAuctionResponseDto liveAuctionList = liveBoardService.getLiveAuctions(broadcast_id);
        System.out.println(liveAuctionList.toString());
        return ResponseEntity.ok().body(liveAuctionList);
    }

    @GetMapping("/list/{broadcast_id}/info")
    public ResponseEntity<?> aboutBroadcast(@PathVariable Long broadcast_id){
        BroadcastLiveAuctionResponseDto broadcastLiveAuctionResponseDto = liveBoardService.getLiveAuctionListByBroadcastId(broadcast_id);
        return ResponseEntity.ok().body(broadcastLiveAuctionResponseDto);
    }

}

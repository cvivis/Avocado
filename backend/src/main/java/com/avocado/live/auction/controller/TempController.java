package com.avocado.live.auction.controller;

import com.avocado.live.auction.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/temp")
public class TempController {

    private final BidService bidService;

    //관리자가 방송을 키고 끄는 것을 통제

    //방송 시작
    @PutMapping("/broadcast/status/on/{id}")
    public ResponseEntity<?> broadcastOn(@PathVariable Long id) {
        if(bidService.broadcastOnAndOff(id, true)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    //방송 종료
    @PutMapping("/broadcast/status/off/{id}")
    public ResponseEntity<?> broadcastOff(@PathVariable Long id) {
        if(bidService.broadcastOnAndOff(id, false)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}

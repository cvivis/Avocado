package com.avocado.liveAuction.controller;

import com.avocado.live.domain.Broadcast;
import com.avocado.liveAuction.domain.entity.TempBroadCast;
import com.avocado.liveAuction.service.TempBroadcastService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/temp")
@Slf4j
public class TempController {

    private final TempBroadcastService tempBroadcastService;


    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok().build();
    }
    @GetMapping("/broadcasts")
    public ResponseEntity<?> broadcastList() {
        List<TempBroadCast> broadCastList = tempBroadcastService.findAll();
        log.info("[TempController broadcastList] 1st broadcast title: {}",broadCastList.get(0) );
        return ResponseEntity.status(HttpStatus.OK).body(broadCastList.toArray());
    }
 }

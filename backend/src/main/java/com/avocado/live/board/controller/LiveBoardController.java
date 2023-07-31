package com.avocado.live.board.controller;

import com.avocado.live.board.service.LiveBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
@Slf4j

public class LiveBoardController {

    private final LiveBoardService liveBoardService;






}

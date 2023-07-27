package com.avocado.live.controller;

import com.avocado.live.service.BroadcastService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/broadcast")
public class OpenviduController {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    private final BroadcastService broadcastService;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    // 방송하나에 여러 경매 품목이 있다.
    // 여기에 대해 다시 구현해야 할듯

    /**
     * 상품 위탁
     * 관리자가 그걸 보고 승인 -> 상품 하나당 라이브 경매 테이블 하나
     * 그 후 관리자가 방송을 만들면 해당
     */
    @PostMapping("/organization")
    public ResponseEntity<String> initializeSession(@RequestBody List<Long> auctionIds)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(null).build();
        Session session = openvidu.createSession(properties);
        broadcastService.assign(session.getSessionId(), auctionIds);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    @PostMapping("/connections/{broadcastId}")
    public ResponseEntity<String> createConnection(@PathVariable("broadcastId") Long broadcastId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String broadcastSessionId = broadcastService.getBroadcastSessionId(broadcastId);
        Session session = openvidu.getActiveSession(broadcastSessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}

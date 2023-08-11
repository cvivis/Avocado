package com.avocado.live.broadcast.controller;

import com.avocado.live.broadcast.service.BroadcastService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
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

    @PostMapping("/init")
    public ResponseEntity<Long> initializeSession() throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(null).build();
        Session session = openvidu.createSession(properties);
        Long broadcastId = broadcastService.save(session.getSessionId());
        return new ResponseEntity<>(broadcastId, HttpStatus.OK);
    }

    @PostMapping("/connection/{broadcastId}")
    public ResponseEntity<String> createConnection(@PathVariable("broadcastId") Long broadcastId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String broadcastSessionId = broadcastService.getBroadcastSessionId(broadcastId);
        Session session = openvidu.getActiveSession(broadcastSessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(null).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}


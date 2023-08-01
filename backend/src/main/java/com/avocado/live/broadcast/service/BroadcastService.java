package com.avocado.live.broadcast.service;

import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.live.broadcast.domain.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BroadcastService {

    private final BroadcastRepository broadcastRepository;

    public Long save(String sessionId) {
        Broadcast save = broadcastRepository.save(new Broadcast(sessionId));
        return save.getBroadcastId();
    }

    public String getBroadcastSessionId(Long broadcastId) {
        Broadcast broadcast = findBroadcastOrElseThrow(broadcastId);
        return broadcast.getSessionId();
    }

    private Broadcast findBroadcastOrElseThrow(Long broadcastId) {
        Optional<Broadcast> broadcast = broadcastRepository.findById(broadcastId);
        if (broadcast.isEmpty()) {
            throw new IllegalArgumentException();
        }
        return broadcast.get();
    }
}

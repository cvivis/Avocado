package com.avocado.live.temp.service;

import com.avocado.live.temp.domain.Broadcast;
import com.avocado.live.temp.domain.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BroadcastService {

    private final BroadcastRepository broadcastRepository;
    private final AuctionService auctionService;

    @Transactional
    public Long assign(String sessionId, List<Long> auctionIds) {
        Broadcast broadcast = broadcastRepository.save(new Broadcast(sessionId));
        auctionService.assignBroadcast(broadcast.getId(), auctionIds);
        return broadcast.getId();
    }

    @Transactional
    public String getBroadcastSessionId(Long broadcastId) {
        Broadcast broadcast = findBroadcastOrElseThrow(broadcastId);
        broadcast.onOff();
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

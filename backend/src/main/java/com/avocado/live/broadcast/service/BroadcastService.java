package com.avocado.live.broadcast.service;

import com.avocado.admin.controller.dto.live.BroadcastCreateDto;
import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.live.broadcast.domain.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BroadcastService {

    private final BroadcastRepository broadcastRepository;

    @Transactional
    public Long save(String sessionId ,BroadcastCreateDto broadcastCreateDto) {
        Broadcast save = broadcastRepository.save(Broadcast.builder()
                .title(broadcastCreateDto.getTitle())
                .introduce(broadcastCreateDto.getIntroduce())
                .startAt(broadcastCreateDto.getStartAt())
                .sessionId(sessionId)
                .status(false).build());
        return save.getId();
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

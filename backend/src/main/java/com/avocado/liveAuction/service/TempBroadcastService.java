package com.avocado.liveAuction.service;

import com.avocado.liveAuction.domain.entity.TempBroadCast;
import com.avocado.liveAuction.domain.repository.TempBroadCastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TempBroadcastService {
    private final TempBroadCastRepository tempBroadCastRepository;

    public List<TempBroadCast> findAll() {
        return tempBroadCastRepository.findAll();
    }
}

package com.avocado.live.temp_liveAuction.service;

import com.avocado.live.temp_liveAuction.domain.entity.TBroadcast;
import com.avocado.live.temp_liveAuction.domain.repository.TBroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TBroadcastService {

    private final TBroadcastRepository tBroadcastRepository;

    public List<TBroadcast> findAll(){
        return tBroadcastRepository.findAll();
    }

    @Transactional
    public boolean broadcastOnAndOff(Long id, boolean OnOff) {
        TBroadcast broadcast = tBroadcastRepository.findById(id).orElse(null);
        if(Objects.isNull(broadcast)) return false;
        else {
            broadcast.setStatus(OnOff);
            tBroadcastRepository.save(broadcast);
        }
        return true;
    }
}

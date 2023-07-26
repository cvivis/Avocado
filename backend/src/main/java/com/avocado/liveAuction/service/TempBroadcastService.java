package com.avocado.liveAuction.service;

import com.avocado.liveAuction.domain.entity.TempBroadCast;
import com.avocado.liveAuction.domain.repository.TempBroadCastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TempBroadcastService {
    private final TempBroadCastRepository tempBroadCastRepository;

    public List<TempBroadCast> findAll() {
        return tempBroadCastRepository.findAll();
    }

    @Transactional
    public void startBroadcastStatus(Long id) {
        TempBroadCast tempBroadCast = tempBroadCastRepository.findById(id).orElse(null);
        if(!Objects.isNull(tempBroadCast)) {
            tempBroadCast.setStatus(true);
            tempBroadCastRepository.save(tempBroadCast);
        }
    }
}

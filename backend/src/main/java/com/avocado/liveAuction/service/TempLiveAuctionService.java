package com.avocado.liveAuction.service;

import com.avocado.liveAuction.domain.entity.TempBroadCast;
import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import com.avocado.liveAuction.domain.repository.TempLiveAuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TempLiveAuctionService {
    private final TempLiveAuctionRepository tempLiveAuctionRepository;

    public List<TempLiveAuction> findAllByBroadcast(Long id) {
        return tempLiveAuctionRepository.findAllByBID(id);
    }

    @Transactional
    public void liveAuctionOnAndOff(Long id, boolean isAuctionOn) {
        TempLiveAuction tempLiveAuction = tempLiveAuctionRepository.findById(id).orElse(null);
        if(!Objects.isNull(tempLiveAuction)) {
            tempLiveAuction.setStatus(isAuctionOn);
            tempLiveAuctionRepository.save(tempLiveAuction);
        }
    }
}

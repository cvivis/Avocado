package com.avocado.live.temp.service;

import com.avocado.live.temp.domain.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;

    @Transactional
    public void assignBroadcast(Long broadcastId, List<Long> auctionIds) {
        auctionRepository.updateBroadcastForAuctions(broadcastId, auctionIds);
    }
}

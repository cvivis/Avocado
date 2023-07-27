package com.avocado.liveAuction.service;

import com.avocado.liveAuction.domain.entity.LiveAuctionHistory;
import com.avocado.liveAuction.domain.repository.LiveAuctionHistoryRepository;
import com.avocado.tempLiveAuction.domain.entity.TempLiveAuctionHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LiveAuctionHistoryService {
    private final LiveAuctionHistoryRepository liveAuctionHistoryRepository;

    public LiveAuctionHistory findMaxBid(Long auctionId) {
        return liveAuctionHistoryRepository.findByAuction(auctionId).stream()
                .max(Comparator.comparing(LiveAuctionHistory::getBidPrice)).orElse(null);
    }

    public Integer highestBidPrice(Long auctionId) {
        LiveAuctionHistory liveAuctionHistory = findMaxBid(auctionId);
        if(Objects.isNull(liveAuctionHistory)) return null;
        return liveAuctionHistory.getBidPrice();
    }
}

package com.avocado.liveAuction.service;

import com.avocado.liveAuction.domain.entity.LiveAuction;
import com.avocado.liveAuction.domain.entity.LiveAuctionHistory;
import com.avocado.liveAuction.domain.repository.LiveAuctionHistoryRepository;
import com.avocado.member.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
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

    public String highestBidMemberEmail(Long auctionId) {
        LiveAuctionHistory liveAuctionHistory = findMaxBid(auctionId);
        if(Objects.isNull(liveAuctionHistory)) return null;
        return liveAuctionHistory.getMember().getEmail();
    }

    @Transactional
    public void saveHistory(Member bidMember, LiveAuction liveAuction, Integer bidPrice) {
        LiveAuctionHistory liveAuctionHistory = liveAuctionHistoryRepository.findByLiveAuction_IdAndMember_Id(liveAuction.getId(),bidMember.getId()).orElse(null);
        if(Objects.isNull(liveAuctionHistory)) {
            liveAuctionHistoryRepository.save(LiveAuctionHistory.builder()
                            .member(bidMember)
                            .bidPrice(bidPrice)
                            .liveAuction(liveAuction).build());
            return;
        }
        liveAuctionHistory.setMember(bidMember);
        liveAuctionHistory.setBidPrice(bidPrice);
        liveAuctionHistoryRepository.save(liveAuctionHistory);
    }


}

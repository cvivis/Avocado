package com.avocado.live.temp_liveAuction.service;

import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuction;
import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuctionHistory;
import com.avocado.live.temp_liveAuction.domain.repository.TLiveAuctionHistoryRepository;
import com.avocado.member.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TLiveAuctionHistoryService {
    private final TLiveAuctionHistoryRepository liveAuctionHistoryRepository;

    public TLiveAuctionHistory findMaxBid(Long auctionId) {
        return liveAuctionHistoryRepository.findByAuction(auctionId).stream()
                .max(Comparator.comparing(TLiveAuctionHistory::getBidPrice)).orElse(null);
    }

    public Integer highestBidPrice(Long auctionId) {
        TLiveAuctionHistory liveAuctionHistory = findMaxBid(auctionId);
        if(Objects.isNull(liveAuctionHistory)) return null;
        return liveAuctionHistory.getBidPrice();
    }

    public String highestBidMemberEmail(Long auctionId) {
        TLiveAuctionHistory liveAuctionHistory = findMaxBid(auctionId);
        if(Objects.isNull(liveAuctionHistory)) return null;
        return liveAuctionHistory.getMember().getEmail();
    }

    @Transactional
    public void saveHistory(Member bidMember, TLiveAuction liveAuction, Integer bidPrice) {
        TLiveAuctionHistory liveAuctionHistory = liveAuctionHistoryRepository.findByLiveAuction_IdAndMember_Id(liveAuction.getId(),bidMember.getId()).orElse(null);
        if(Objects.isNull(liveAuctionHistory)) {
            liveAuctionHistoryRepository.save(TLiveAuctionHistory.builder()
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

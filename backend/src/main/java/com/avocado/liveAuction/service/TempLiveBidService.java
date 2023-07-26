package com.avocado.liveAuction.service;

import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import com.avocado.liveAuction.domain.entity.TempLiveAuctionHistory;
import com.avocado.liveAuction.domain.repository.TempLiveAuctionHistoryRepository;
import com.avocado.liveAuction.domain.repository.TempLiveAuctionRepository;
import com.avocado.member.domain.entity.Member;
import com.avocado.member.domain.reposiotry.MemberRepository;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TempLiveBidService {
    private final TempLiveAuctionHistoryRepository tempLiveAuctionHistoryRepository;
    private final MemberRepository memberRepository;
    private final TempLiveAuctionRepository tempLiveAuctionRepository;

    @Transactional
    public TempLiveAuctionHistory bid(String email, Long auctionId, int bid_price) {
        Member bidMember = memberRepository.findByEmail(email).orElse(null);
        TempLiveAuction bidAuction = tempLiveAuctionRepository.findById(auctionId).orElse(null);
        if(Objects.isNull(bidMember) || Objects.isNull(bidAuction)) return null;

        TempLiveAuctionHistory tempLiveAuctionHistory = findMaxBid(auctionId);

        if(Objects.isNull(tempLiveAuctionHistory) || bid_price > tempLiveAuctionHistory.getBid_price()) {
            TempLiveAuctionHistory saved = tempLiveAuctionHistoryRepository.save(TempLiveAuctionHistory.builder()
                            .bid_price(bid_price)
                            .tempLiveAuction(bidAuction)
                            .member(bidMember).build());
            return saved;
        }
        return null;
    }

    public TempLiveAuctionHistory findMaxBid(Long auctionId) {
        return tempLiveAuctionHistoryRepository.findByAuction(auctionId).stream()
                .max(Comparator.comparing(TempLiveAuctionHistory::getBid_price)).orElse(null);
    }
}

package com.avocado.liveAuction.service;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.domain.entity.LiveAuction;
import com.avocado.liveAuction.domain.entity.LiveAuctionHistory;
import com.avocado.liveAuction.domain.repository.LiveAuctionRepository;
import com.avocado.member.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
@Slf4j
public class LiveAuctionService {

    private final LiveAuctionRepository liveAuctionRepository;

    public List<LiveAuction> findAllByBroadcastId(Long id) {
        return liveAuctionRepository.findByBroadcast_Id(id).orElse(null);
    }

    public LiveAuction findById(Long auctionId) {
        return liveAuctionRepository.findById(auctionId).orElse(null);
    }

    @Transactional
    public LiveAuction liveAuctionBegin(Long id) {
        LiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction)) return null;
        liveAuction.setStatus(1);
        return liveAuctionRepository.save(liveAuction);
    }

    @Transactional
    public LiveAuction liveAuctionStop(Long id) {
        LiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction)) return null;
        liveAuction.setStatus(2);
        return liveAuctionRepository.save(liveAuction);
    }

    @Transactional
    public LiveAuction updateCurrentPrice(Long auctionId, Integer bidPrice, Member bidMember) {
        LiveAuction auction = liveAuctionRepository.findById(auctionId).orElse(null);
        //최고입찰자가 본일일 경우 고려하지 않았음
        if(Objects.isNull(auction.getSuccessPrice()) || auction.getSuccessPrice() < bidPrice) {
            auction.setSuccessPrice(bidPrice);
            auction.setMember(bidMember);
            return liveAuctionRepository.save(auction);
        }
       return null;
    }
}

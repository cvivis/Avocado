package com.avocado.live.temp_liveAuction.service;

import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuction;
import com.avocado.live.temp_liveAuction.domain.repository.TLiveAuctionRepository;
import com.avocado.member.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class TLiveAuctionService {

    private final TLiveAuctionRepository liveAuctionRepository;

    public List<TLiveAuction> findAllByBroadcastId(Long id) {
        return liveAuctionRepository.findByBroadcast_Id(id).orElse(null);
    }

    public TLiveAuction findById(Long auctionId) {
        return liveAuctionRepository.findById(auctionId).orElse(null);
    }

    @Transactional
    public TLiveAuction liveAuctionBegin(Long id) {
        TLiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction)) return null;
        liveAuction.setStatus(1);
        return liveAuctionRepository.save(liveAuction);
    }

    @Transactional
    public TLiveAuction liveAuctionStop(Long id) {
        TLiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction)) return null;
        liveAuction.setStatus(2);
        return liveAuctionRepository.save(liveAuction);
    }

    @Transactional
    public TLiveAuction updateCurrentPrice(Long auctionId, Integer bidPrice, Member bidMember) {
        TLiveAuction auction = liveAuctionRepository.findById(auctionId).orElse(null);
        //최고입찰자가 본일일 경우 고려하지 않았음
        if(Objects.isNull(auction.getSuccessPrice()) || auction.getSuccessPrice() < bidPrice) {
            auction.setSuccessPrice(bidPrice);
            auction.setMember(bidMember);
            return liveAuctionRepository.save(auction);
        }
       return null;
    }
}

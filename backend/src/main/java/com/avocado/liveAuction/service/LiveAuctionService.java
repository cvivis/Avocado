package com.avocado.liveAuction.service;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.domain.entity.LiveAuction;
import com.avocado.liveAuction.domain.entity.LiveAuctionHistory;
import com.avocado.liveAuction.domain.repository.LiveAuctionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LiveAuctionService {

    private final LiveAuctionRepository liveAuctionRepository;
    private final LiveAuctionHistoryService liveAuctionHistoryService;

    public List<LiveAuction> findAllByBroadcastId(Long id) {
        return liveAuctionRepository.findByBroadcast_Id(id).orElse(null);
    }

    @Transactional
    public boolean liveAuctionBegin(Long id) {
        LiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction)) return false;
        liveAuction.setStatus(1);
        liveAuctionRepository.save(liveAuction);
        return true;
    }

    @Transactional
    public boolean liveAuctionStop(Long id) {
        LiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction)) return false;
        liveAuction.setStatus(2);
        log.info("[LiveAuctionService liveAuctionStop] liveAuction {} isn't null",id);
        LiveAuctionHistory highest = liveAuctionHistoryService.findMaxBid(id);
        if(!Objects.isNull(highest)) {
            log.info("[LiveAuctionService liveAuctionStop] highest_bid isn't null");
            liveAuction.setMember(highest.getMember());
            liveAuction.setSuccessPrice(highest.getBidPrice());
        }
        liveAuctionRepository.save(liveAuction);
        return true;
    }
}

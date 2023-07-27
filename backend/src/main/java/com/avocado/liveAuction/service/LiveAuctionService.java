package com.avocado.liveAuction.service;

import com.avocado.liveAuction.controller.dto.AuctionsResponseDto;
import com.avocado.liveAuction.domain.entity.LiveAuction;
import com.avocado.liveAuction.domain.repository.LiveAuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LiveAuctionService {

    private final LiveAuctionRepository liveAuctionRepository;

    public List<LiveAuction> findAllByBroadcastId(Long id) {
        return liveAuctionRepository.findByBroadcast_Id(id).orElse(null);
    }
}

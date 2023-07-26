package com.avocado.normal.auction.service;


import com.avocado.normal.auction.controller.dto.NormalBidRequestDto;
import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import com.avocado.normal.auction.domain.repository.NormalAuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NormalAuctionService {

    private final NormalAuctionRepository normalAuctionRepository;

    public NormalBidResponseDto doBid(NormalBidRequestDto normalBidRequestDto){


        return
    }

}

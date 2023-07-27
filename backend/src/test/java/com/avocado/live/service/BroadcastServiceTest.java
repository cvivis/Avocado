package com.avocado.live.service;

import java.util.*;

import com.avocado.live.domain.Auction;
import com.avocado.live.domain.AuctionRepository;
import com.avocado.live.domain.BroadcastRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BroadcastServiceTest {

    @Autowired
    BroadcastService broadcastService;

    @Autowired
    AuctionRepository auctionRepository;

    @Test
    public void 상품에_방송배정() {
        // given
        List<Long> auctionIds = Arrays.asList(1L, 2L, 3L, 4L);

        // when
        broadcastService.assign("test", auctionIds);
        List<Auction> auctions = auctionRepository.findAll();

        //then
        assertThat(auctions.size()).isEqualTo(4);
    }

}
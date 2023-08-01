package com.avocado.live.temp_liveAuction.domain.repository;

import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TLiveAuctionRepository extends JpaRepository<TLiveAuction, Long> {
    Optional<List<TLiveAuction>> findByBroadcast_Id(Long id);
}

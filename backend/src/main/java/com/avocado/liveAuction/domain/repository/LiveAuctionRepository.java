package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.LiveAuction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LiveAuctionRepository extends JpaRepository<LiveAuction, Long> {
    Optional<List<LiveAuction>> findByBroadcast_Id(Long id);
}

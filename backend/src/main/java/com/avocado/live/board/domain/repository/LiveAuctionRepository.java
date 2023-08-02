package com.avocado.live.board.domain.repository;

import com.avocado.live.board.domain.entity.LiveAuction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LiveAuctionRepository extends JpaRepository <LiveAuction, Long> {
    Optional<List<LiveAuction>> findByBroadcast_Id(Long broadcast_id);
}


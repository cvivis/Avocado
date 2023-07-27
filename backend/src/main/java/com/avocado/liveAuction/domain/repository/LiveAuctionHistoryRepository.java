package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.LiveAuctionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LiveAuctionHistoryRepository extends JpaRepository<LiveAuctionHistory, Long> {
    @Query(value = "select * from live_auction_history a where a.live_auction_id=:auctionId",nativeQuery = true)
    List<LiveAuctionHistory> findByAuction(@Param("auctionId") Long auctionId);
}

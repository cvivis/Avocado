package com.avocado.live.temp_liveAuction.domain.repository;

import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuctionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TLiveAuctionHistoryRepository extends JpaRepository<TLiveAuctionHistory, Long> {
    @Query(value = "select * from live_auction_history a where a.live_auction_id=:auctionId",nativeQuery = true)
    List<TLiveAuctionHistory> findByAuction(@Param("auctionId") Long auctionId);

    Optional<TLiveAuctionHistory> findByLiveAuction_IdAndMember_Id(Long auctionId, Long memberId);
}

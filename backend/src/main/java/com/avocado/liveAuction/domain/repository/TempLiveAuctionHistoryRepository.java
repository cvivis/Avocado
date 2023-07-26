package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import com.avocado.liveAuction.domain.entity.TempLiveAuctionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TempLiveAuctionHistoryRepository extends JpaRepository<TempLiveAuctionHistory, Long> {
    @Query(value = "select * from temp_live_auction_history a where a.member_id = :memberId and a.templiveauction_id=:auctionId",nativeQuery = true)
    Optional<TempLiveAuctionHistory> findByMemberAndAuction(@Param("memberId") Long memberId, @Param("auctionId") Long auctionId);

    @Query(value = "select * from temp_live_auction_history a where a.templiveauction_id=:auctionId",nativeQuery = true)
    List<TempLiveAuctionHistory> findByAuction(@Param("auctionId") Long auctionId);
}

package com.avocado.live.temp.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    @Modifying
    @Query("UPDATE Auction a SET a.broadcastId = :broadcastId WHERE a.id IN :auctionIds")
    int updateBroadcastForAuctions(@Param("broadcastId") Long broadcastId, @Param("auctionIds") List<Long> auctionIds);

}

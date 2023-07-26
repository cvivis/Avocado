package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TempLiveAuctionRepository extends JpaRepository<TempLiveAuction, Long> {

    @Query(value = "select * from temp_live_auction a where a.broadcast_id = :broadcastid",nativeQuery = true)
    List<TempLiveAuction> findAllByBID(@Param("broadcastid") Long id);
}

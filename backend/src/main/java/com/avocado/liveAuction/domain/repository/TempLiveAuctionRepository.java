package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.TempLiveAuction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempLiveAuctionRepository extends JpaRepository<TempLiveAuction, Long> {
}

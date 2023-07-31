package com.avocado.normal.auction.domain.repository;

import com.avocado.normal.auction.domain.entity.NormalAuction;
import com.avocado.normal.auction.domain.entity.NormalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NormalHistoryRepository extends JpaRepository<NormalHistory, Long> {
    Optional<NormalHistory> findFirstByOrderByBidPriceDescCreatedAtAsc();
}

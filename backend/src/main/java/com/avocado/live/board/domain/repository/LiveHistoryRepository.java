package com.avocado.live.board.domain.repository;

import com.avocado.live.board.domain.entity.LiveHistory;
import com.avocado.normal.entity.NormalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LiveHistoryRepository extends JpaRepository<LiveHistory, Long> {
    Optional<LiveHistory> findByLiveAuction_IdAndMember_Id(Long auctionId, Long memberId);

    Optional<LiveHistory> findFirstByLiveAuction_IdOrderByBidPriceDescCreatedAtAsc(Long id);
}

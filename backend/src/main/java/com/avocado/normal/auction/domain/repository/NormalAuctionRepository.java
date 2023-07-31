package com.avocado.normal.auction.domain.repository;

import com.avocado.member.domain.entity.Member;
import com.avocado.normal.auction.domain.entity.NormalAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NormalAuctionRepository extends JpaRepository<NormalAuction, Long> {
}

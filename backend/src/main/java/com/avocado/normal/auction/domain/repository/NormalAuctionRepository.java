package com.avocado.normal.auction.domain.repository;


import com.avocado.normal.entity.NormalAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NormalAuctionRepository extends JpaRepository<NormalAuction, Long> {
}

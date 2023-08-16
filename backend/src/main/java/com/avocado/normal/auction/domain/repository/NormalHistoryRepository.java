package com.avocado.normal.auction.domain.repository;

import com.avocado.normal.entity.NormalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NormalHistoryRepository extends JpaRepository<NormalHistory, Long> {

    // insert방식의 최고입찰가 가져오기
    Optional<NormalHistory> findFirstByNormalAuction_IdOrderByBidPriceDescCreatedAtAsc(Long id);

    //update방식 적용의 최고 입찰가 가져오기

//    Optional<NormalHistory> findby

    //입찰기록에 해당 상품에 member_id 있는지 조회
    Optional<NormalHistory> findByNormalAuction_IdAndMember_Id(Long normalId, Long memberId);
    Optional<List<NormalHistory>> findByNormalAuction_Id(Long id);

}

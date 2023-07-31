package com.avocado.Item.domain.repository;

import com.avocado.Item.controller.dto.MyBidResponseEntries;
import com.avocado.Item.controller.dto.MySaleResponseEntries;
import com.avocado.Item.domain.entity.Item;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // 상품ID, 이름, 상태, 타입만 가져옴
    List<MySaleResponseMapping> findItemsByMemberId(Long memberId);

    @Query("SELECT NEW com.avocado.Item.controller.dto.MyBidResponseEntries" +
            "(i.id, i.name, i.type, i.category, nh.currentBid, nh.myBid )" +
            "FROM normalHistory nh " +
            "JOIN item i ON nh.itemID = i.id")
    List<MyBidResponseEntries> findMyNormalBidsByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT NEW com.avocado.Item.controller.dto.MyBidResponseEntries" +
            "(i.id, i.name, i.type, i.category, lh.currentBid, lh.myBid )" +
            "FROM LiveHistory lh " +
            "JOIN item i ON nh.itemID = i.id")
    List<MyBidResponseEntries> findMyLiveBidsByMemberId(@Param("memberId") Long memberId);

    // 전체 리스트 반환
//    @Query("SELECT NEW com.avocado.normal.board.controller.dto.NormalResponseEntryDto(i.id, i.name, nh.bidPrice, i.hopePrice, a.start_at, a.end_at) " +
//            "FROM item i " +
//            "JOIN normalHistory nh ON i.id = nh.autionId " +
//            "JOIN aution a ON a.id = nh.autionId")


//    DECLARE @Str CHAR(1) = 'Y'; -- 조건 구분값 (Y or N)
//
//    SELECT *
//    FROM TABLE1 A
//    LEFT JOIN TABLE2 B ON A.COL1 = B.COL1
//    LEFT JOIN TABLE3 C ON A.COL1 = C.COL1
//    WHERE (@Str = 'Y' AND B.COL1 IS NOT NULL)  -- 'Y'일 경우 TABLE2와 조인
//    OR (@Str = 'N' AND C.COL1 IS NOT NULL) -- 'N'일 경우 TABLE3과 조인
    

}

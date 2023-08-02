package com.avocado.Item.domain.repository;

import com.avocado.Item.controller.dto.MyBidResponseEntries;
import com.avocado.Item.controller.dto.MySaleResponseEntries;
import com.avocado.Item.controller.dto.MySuccessBidEntries;
import com.avocado.Item.domain.entity.Item;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // 상품ID, 이름, 상태, 타입만 가져옴
    @Query("SELECT NEW com.avocado.Item.controller.dto.MySaleResponseEntries" +
            "(i.id, i.name, i.itemStatus, i.type) " +
            "FROM item i " +
            "JOIN member m ON i.member.id = :memberId ")
            //"WHERE i.member.id = :memberId")
    List<MySaleResponseEntries> findItemsByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT NEW com.avocado.Item.controller.dto.MyBidResponseEntries" +
            "(i.id, nh.normalAuction.id, i.name, i.type, i.category, nh.bidPrice )" +
            "FROM normalHistory nh " +
            "JOIN item i ON nh.normalAuction.item.id = i.id " +
            "WHERE nh.member.id = :memberId AND i.itemStatus = com.avocado.Item.domain.entity.ItemStatus.ASSIGN")
    List<MyBidResponseEntries> findMyNormalBidsByMemberId(@Param("memberId") Long memberId);

//    @Query("SELECT NEW com.avocado.Item.controller.dto.MySuccessBidEntries" +
//            "(i.id, i.name, i.type, i.category, " +
//            "CASE i.type" +
//            "   WHEN com.avocado.Item.domain.entity.Type.NORMAL THEN na.successPrice " +
//            "   ELSE la.successPrice " +
//            "END " +
//            ") " +
//            "FROM item i " +
//            "LEFT JOIN normalAuction na ON na.successMember = :memberId " +
//            "LEFT JOIN liveAuction la ON la.successMember = :memberId " +
//            "WHERE i.type = com.avocado.Item.domain.entity.Type.NORMAL " +
//            "OR i.type = com.avocado.Item.domain.entity.Type.LIVE ")
    // 상시 테스트용 쿼리
    @Query("SELECT NEW com.avocado.Item.controller.dto.MySuccessBidEntries" +
            "(i.id, i.name, i.type, i.category, na.successPrice) " +
            "FROM item i " +
            "JOIN normalAuction na ON na.successMember = :memberId " +
            "WHERE i.type = com.avocado.Item.domain.entity.Type.NORMAL ")
    List<MySuccessBidEntries> findMySuccessBidByMemberId(Long memberId);
    
    
// TODO : 아래 참고용 쿼리 추후에 지우기
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

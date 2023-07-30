package com.avocado.Item.domain.repository;

import com.avocado.Item.controller.dto.MySaleResponseEntries;
import com.avocado.Item.domain.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<MySaleResponseMapping> findItemsByMemberId(Long memberId); // 상품ID, 이름, 상태, 타입만 가져옴

//    @Query("SELECT item.productId, auction.auctionId, item.productName " +
//            "FROM item item " +
//            "JOIN Auction auction ON item.productId = auction.product.id " +
//            "WHERE item.memberId = :memberId")
//    List<MySaleResponseEntries> findMySalesByMemberId(@Param("memberId") Long memberId);
//
//    @Query("SELECT item.id, item.name, item.content, item.type, item.itemStatus," +
//            "item.category, item.hopePrice," +
//            "CASE " +
//            "WHEN item.type = 'NORMAL'" +
//            "THEN n.auctionId, n.currentBid, n.successBid")
//    MySaleDetailResponseDto findMySalesDetailByItemId(@Param("itemId") Long itemId);
    
    

}

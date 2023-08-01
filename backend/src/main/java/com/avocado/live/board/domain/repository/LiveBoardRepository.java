//package com.avocado.live.board.domain.repository;
//
//import com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto;
//import com.avocado.live.board.controller.dto.BroadcastResponseDto;
//import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
//import com.avocado.live.board.domain.entity.Item;
//import com.avocado.live.board.domain.entity.LiveAuction;
//import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuction;
//import io.lettuce.core.dynamic.annotation.Param;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.List;
//import java.util.Optional;
//
//
//public interface LiveBoardRepository extends JpaRepository <Item,Long> {
//
//
//
//
//    //물건 상세 보기
//    @Query("select new com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto(la.id,i.id,i.name,i.hopePrice, i.category,i.instantPrice) "+
//            "from item i "+
//            "join liveAuction la on i.id = la.itemId " +
//            "where i.id = :id")
//    BroadcastItemResponseEntryDto findLiveDetailById(@Param("id")Long id);
//
//
//
//
//
//
//
//
//
//
//    //라이브 편성 상세보기
//
//    //
//}

package com.avocado.live.board.domain.repository;

import com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto;
import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
import com.avocado.live.board.domain.entity.Item;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface LiveBoardRepository extends JpaRepository <Item,Long> {
    //방송 편성 리스트는 민재님 테스트 후 완성
    
    //방송 편성 상세 보기 또한



    //라이브 방송 경매 리스트 반환
    @Query("select new com.avocado.live.board.controller.dto.BroadcastResponseEntryDto(la.id, i.id, b.title, b.link ,b.status, b.startAt)"+
            "from item i "+
            "join liveAuction la on i.id=la.itemId "+
            "join Broadcast b on b.broadcastId=la.broadcastId")
    List<BroadcastResponseEntryDto> findAllLiveItemList();


    //방송 내 검색 리스트 반환
    @Query("select new com.avocado.live.board.controller.dto.BroadcastResponseEntryDto(la.id, i.id, b.title, b.link ,b.status, b.startAt)"+
            "from item i "+
            "join liveAuction la on i.id=la.itemId "+
            "join Broadcast b on b.broadcastId=la.broadcastId "+
            "where i.name like :keyword")
    List<BroadcastResponseEntryDto> findByLiveItemNameContains(@Param("keyword") String keyword);

    //물건 상세 보기
    @Query("select new com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto(la.id,i.id,i.name,i.hopePrice, i.category,i.instantPrice) "+
            "from item i "+
            "join liveAuction la on i.id = la.itemId " +
            "where i.id = :id")
    BroadcastItemResponseEntryDto findLiveDetailById(@Param("id")Long id);










    //라이브 편성 상세보기

    //
}

package com.avocado.live.board.domain.repository;

import com.avocado.live.board.controller.dto.BroadcastResponseDto;
import com.avocado.live.board.controller.dto.BroadcastResponseEntryDto;
import com.avocado.live.board.domain.entity.Item;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface LiveBoardRepository extends JpaRepository <Item,Long> {

    //전체 리스트 반환
    @Query("select new com.avocado.live.board.controller.dto.BroadcastResponseEntryDto(la.id, i.id, b.title, b.link ,b.broadcastStatus, b.startAt)"+
            "from item i "+
            "join liveAuction la on i.id=la.itemId "+
            "join Broadcast b on b.broadcastId=la.broadcastId")
    List<BroadcastResponseDto> findAllLiveItemList();


    //검색 리스트 반환
    @Query("select new com.avocado.live.board.controller.dto.BroadcastResponseEntryDto(la.id, i.id, b.title, b.link ,b.broadcastStatus, b.startAt)"+
            "from item i "+
            "join liveAuction la on i.id=la.itemId "+
            "join Broadcast b on b.broadcastId=la.broadcastId "+
            "where i.name like :keyword")
    List<BroadcastResponseEntryDto> findByLiveItemNameContains(@Param("keyword") String keyword);

    //상세 보기
    @Query("select new com.avocado.live.board.controller.dto.BroadcastItemResponseEntryDto()")







    //라이브 편성 상세보기

    //
}

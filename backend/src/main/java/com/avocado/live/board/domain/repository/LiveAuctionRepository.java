package com.avocado.live.board.domain.repository;

import com.avocado.live.board.controller.dto.BroadcastLiveAuctionResponseEntryDto;
import com.avocado.live.board.controller.dto.LiveAuctionResponseEntryDto;
import com.avocado.live.board.domain.entity.LiveAuction;
import io.lettuce.core.dynamic.annotation.Param;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LiveAuctionRepository extends JpaRepository <LiveAuction, Long> {

    @Query("select new com.avocado.live.board.controller.dto.LiveAuctionResponseEntryDto(la.id,i.name,i.hopePrice,i.category,i.instantPrice,la.status) "+
            "from LiveAuction la "+
            "Join item i on la.item.id=i.id "+
            "where la.broadcast.id =  :id")
    List<LiveAuctionResponseEntryDto> findLiveAuctionByBroadcastId(@Param("id") Long id);


    @Query("select new com.avocado.live.board.controller.dto.BroadcastLiveAuctionResponseEntryDto(la.id,la.status,i.hopePrice,la.successPrice,la.member.email,i.name) "+
            "from LiveAuction la "+
            "join item i on la.item.id=i.id "+
            "where la.broadcast.id = :id")
    List<BroadcastLiveAuctionResponseEntryDto> findBroadcastLiveAuctionsById(@Param ("id")Long id);

    Optional<List<LiveAuction>> findByBroadcast_Id(Long broadcastId);

    Optional<List<LiveAuction>> findByMember_Id(Long memberId);






}


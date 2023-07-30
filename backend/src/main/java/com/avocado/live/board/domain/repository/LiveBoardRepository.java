package com.avocado.live.board.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LiveBoardRepository extends JpaRepository {

    @Query("select new com.avocado.live.board.controller.dto")

}

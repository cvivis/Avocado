package com.avocado.live.board.domain.repository;

import com.avocado.live.broadcast.domain.Broadcast;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BroadcastRepository extends JpaRepository <Broadcast,Long> {

}

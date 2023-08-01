package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.TBroadcast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TBroadcastRepository extends JpaRepository<TBroadcast, Long> {
}

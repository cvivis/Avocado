package com.avocado.liveAuction.domain.repository;

import com.avocado.liveAuction.domain.entity.TempBroadCast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempBroadCastRepository extends JpaRepository<TempBroadCast,Long> {
}

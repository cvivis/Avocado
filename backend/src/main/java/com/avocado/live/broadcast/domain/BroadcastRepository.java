package com.avocado.live.broadcast.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {

    @Query(value = "select * from broadcast  where Date(start_at) = :selectedDate",nativeQuery = true)
    Optional<List<Broadcast>> findByStartAt(@Param("selectedDate") String date);
}

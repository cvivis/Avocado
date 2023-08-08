package com.avocado.live.broadcast.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
}

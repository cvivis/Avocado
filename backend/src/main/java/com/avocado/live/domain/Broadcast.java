package com.avocado.live.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
public class Broadcast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long broadcastId;

    private String sessionId;

    public Broadcast(String sessionId) {
        this.sessionId = sessionId;
    }

    protected Broadcast() {}
}

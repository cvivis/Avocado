package com.avocado.live.temp.domain;

import com.avocado.common.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Entity
public class Broadcast extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sessionId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp startAt;

    @Column(nullable = false)
    private Boolean status;

    public Broadcast(String sessionId) {
        this.sessionId = sessionId;
        this.status = true;
    }

    public void onOff() {
        if (this.status) {
            this.startAt = Timestamp.from(Instant.now());
        }
        this.status = !this.status;
    }

    protected Broadcast() {}
}

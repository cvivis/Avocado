package com.avocado.live.broadcast.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Entity
@Setter
@Builder
@AllArgsConstructor
@ToString
public class Broadcast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;

    @NotNull
    private String title;

    @NotNull
    private String introduce;

    private String link;

    private Boolean status;

    private Date startAt;

    public void onOff() {
        if (this.status) {
            this.startAt = Timestamp.from(Instant.now());
        }
        this.status = !this.status;
    }

    public Broadcast(String sessionId) {
        this.sessionId = sessionId;
        this.status = true;
    }

    protected Broadcast() {}
}

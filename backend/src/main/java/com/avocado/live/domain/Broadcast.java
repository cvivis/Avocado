package com.avocado.live.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Entity
public class Broadcast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long broadcastId;

    private String sessionId;

    @NotNull
    private String title;

    @NotNull
    private String introduce;

    @NotNull
    private String link;

    @NotNull
    private Boolean status;

    @NotNull
    private Date startAt;




    public Broadcast(String sessionId) {
        this.sessionId = sessionId;
    }

    protected Broadcast() {}
}

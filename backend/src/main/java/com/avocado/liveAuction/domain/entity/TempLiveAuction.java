package com.avocado.liveAuction.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString
@Getter
@Setter
public class TempLiveAuction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Integer start_price;

    private Integer highest_price;

    private String bid_useremail;

    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "Broadcast_ID")
    @JsonIgnore
    private TempBroadCast broadcast;
}

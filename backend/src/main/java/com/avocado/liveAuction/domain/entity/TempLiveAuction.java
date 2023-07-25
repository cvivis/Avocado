package com.avocado.liveAuction.domain.entity;

import javax.persistence.*;

@Entity
public class TempLiveAuction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer start_price;

    private Integer highest_price;

    private String bid_useremail;

    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "BroadCast_ID")
    private TempBroadCast broadCast;
}

package com.avocado.live.board.controller.dto;



import com.avocado.Item.domain.entity.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Builder
public class LiveAuctionResponseEntryDto {
    private Long auctionId;
    private String name;
    private Integer hopePrice;
    private Category category;
    private  Integer instantPrice;
    private Integer status; // 경매 진행 상태

    public LiveAuctionResponseEntryDto(Long auctionId, String name, Integer hopePrice, Category category, Integer instantPrice, Integer status ){
        this.auctionId=auctionId;
        this.name=name;
        this.hopePrice=hopePrice;
        this.category=category;
        this.instantPrice=instantPrice;
        this.status = status;
    }

}

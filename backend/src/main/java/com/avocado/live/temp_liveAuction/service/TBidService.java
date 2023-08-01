package com.avocado.live.temp_liveAuction.service;

import com.avocado.live.temp_liveAuction.domain.entity.TLiveAuction;
import com.avocado.member.domain.entity.Member;
import com.avocado.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TBidService {


    private final TLiveAuctionService liveAuctionService;
    private final TLiveAuctionHistoryService liveAuctionHistoryService;
    private final MemberService memberService;

    public boolean bid(Long  auctionId, Integer bidPrice, String email){
        Member bidMember = memberService.getMember(email);
        if(Objects.isNull(bidMember)) return false;

        //경매 현재가 업데이트 --> 더낮으면 예외
        TLiveAuction liveAuction = liveAuctionService.updateCurrentPrice(auctionId, bidPrice, bidMember);
        if(Objects.isNull(liveAuction)) return false;

        //거래내역 삽입
        liveAuctionHistoryService.saveHistory(bidMember, liveAuction, bidPrice);
        return true;
    }
}






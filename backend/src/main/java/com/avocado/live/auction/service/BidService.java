package com.avocado.live.auction.service;

import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.repository.ItemRepository;
import com.avocado.live.board.domain.entity.LiveAuction;
import com.avocado.live.board.domain.entity.LiveHistory;
import com.avocado.live.board.domain.repository.LiveAuctionRepository;
import com.avocado.live.board.domain.repository.LiveHistoryRepository;
import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.live.broadcast.domain.BroadcastRepository;
import com.avocado.member.domain.entity.Member;
import com.avocado.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BidService {

    private final LiveAuctionRepository liveAuctionRepository;
    private final LiveHistoryRepository liveHistoryRepository;
    private final BroadcastRepository broadcastRepository;

    private final MemberService memberService;
    private final ItemRepository itemRepository;

    //웹소켓통신 : 경매 시작
    @Transactional
    public LiveAuction liveAuctionBegin(Long id) {
        LiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction) || liveAuction.getStatus() != 0) return null;
        liveAuction.setStatus(1);
        return liveAuctionRepository.save(liveAuction);
    }


    //웹소켓통신 : 경매종료
    @Transactional
    public LiveAuction liveAuctionStop(Long id) {
        LiveAuction liveAuction = liveAuctionRepository.findById(id).orElse(null);
        if(Objects.isNull(liveAuction) || liveAuction.getStatus() != 1) return null;
        Item item = liveAuction.getItem();
        if(!Objects.isNull(liveAuction.getSuccessPrice())) item.setItemStatus(ItemStatus.SUCCESS);
        else item.setItemStatus(ItemStatus.FAIL);
        itemRepository.save(item);
        liveAuction.setStatus(2);
        return liveAuctionRepository.save(liveAuction);
    }

    //웹소켓 통신 : 경매테이블 갱신
    @Transactional
    public LiveAuction updateCurrentPrice(Long auctionId, Integer bidPrice, Member bidMember) {
        LiveAuction auction = liveAuctionRepository.findById(auctionId).orElse(null);
        //최고입찰자가 본일일 경우 고려하지 않았음
        if(Objects.isNull(auction.getSuccessPrice()) || auction.getSuccessPrice() < bidPrice) {
            auction.setSuccessPrice(bidPrice);
            auction.setMember(bidMember);
            return liveAuctionRepository.save(auction);
        }
        return null;
    }


    //웹소켓 통신 : 입찰 거래내역 갱신
    @Transactional
    public void saveHistory(Member bidMember, LiveAuction liveAuction, Integer bidPrice) {
        LiveHistory liveHistory = liveHistoryRepository.findByLiveAuction_IdAndMember_Id(liveAuction.getId(),bidMember.getId()).orElse(null);
        if(Objects.isNull(liveHistory)) {
            liveHistoryRepository.save(LiveHistory.builder()
                    .member(bidMember)
                    .bidPrice(bidPrice)
                    .liveAuction(liveAuction).build());
            return;
        }
        liveHistory.setMember(bidMember);
        liveHistory.setBidPrice(bidPrice);
        liveHistoryRepository.save(liveHistory);
    }

    //웹소켓 통신 : 사용자 입찰
    public boolean bid(Long  auctionId, Integer bidPrice, String email){
        Member bidMember = memberService.getMember(email);
        if(Objects.isNull(bidMember)) return false;

        //경매 현재가 업데이트 --> 더낮으면 예외
        LiveAuction liveAuction = updateCurrentPrice(auctionId, bidPrice, bidMember);
        if(Objects.isNull(liveAuction)) return false;

        //거래내역 삽입
        saveHistory(bidMember, liveAuction, bidPrice);
        return true;
    }

    //rest api : 방송 시작/종료
    @Transactional
    public boolean broadcastOnAndOff(Long id, boolean OnOff) {
        Broadcast broadcast = broadcastRepository.findById(id).orElse(null);
        if(Objects.isNull(broadcast)) return false;
        else {
            broadcast.setStatus(OnOff);
            broadcastRepository.save(broadcast);
        }
        return true;
    }



}

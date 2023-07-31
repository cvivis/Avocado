package com.avocado.normal.auction.service;


import com.avocado.member.domain.entity.Member;
import com.avocado.member.domain.reposiotry.MemberRepository;
import com.avocado.normal.auction.controller.dto.NormalBidRequestDto;
import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import com.avocado.normal.auction.domain.repository.NormalAuctionRepository;
import com.avocado.normal.auction.domain.repository.NormalHistoryRepository;
import com.avocado.normal.entity.NormalAuction;
import com.avocado.normal.entity.NormalHistory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NormalAuctionService {


    private final NormalHistoryRepository normalHistoryRepository;
    private final NormalAuctionRepository normalAuctionRepository;
    private final MemberRepository memberRepository;


//    @Transactional
    public NormalBidResponseDto doBid(NormalBidRequestDto normalBidRequestDto){
        NormalAuction nowNormal = normalAuctionRepository.findById(normalBidRequestDto.getItemId()).orElse(null);
        Member nowMember = memberRepository.findById(normalBidRequestDto.getMemberId()).orElse(null);
        log.info("nowMember: " + nowMember);
        log.info("nowNormal: " + nowNormal);
        //입찰하기 멤버 조회 후 update 이후 없으면 insert
        NormalHistory normalHistory = NormalHistory.builder()
                .normalAuction(nowNormal)
                .bidPrice(normalBidRequestDto.getPrice())
                .member(nowMember)
                .build();
//        log.info("입찰하기: " + normalHistory.toString());
        normalHistoryRepository.saveAndFlush(normalHistory);

        //최고 입찰가 가져오기
        NormalHistory topBid = normalHistoryRepository.findFirstByOrderByBidPriceDescCreatedAtAsc().orElse(null);
        log.info(topBid.toString());
//        log.info(topBid.getMember().toString());
//        Member topMember = memberRepository.findById(topBid.getMember().)
        NormalBidResponseDto normalBidResponseDto = NormalBidResponseDto.builder()
                .id(topBid.getId())
                .lastBidAt(topBid.getCreatedAt().toLocalDateTime())
                .email(topBid.getMember().getEmail())
                .price(topBid.getBidPrice())
                .build();
        return normalBidResponseDto;
    }

}

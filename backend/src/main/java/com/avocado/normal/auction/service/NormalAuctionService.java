package com.avocado.normal.auction.service;


import com.avocado.member.domain.entity.Member;
import com.avocado.member.domain.reposiotry.MemberRepository;
import com.avocado.normal.auction.controller.dto.NormalBidRequestDto;
import com.avocado.normal.auction.controller.dto.NormalBidResponseDto;
import com.avocado.normal.auction.domain.entity.NormalAuction;
import com.avocado.normal.auction.domain.entity.NormalHistory;
import com.avocado.normal.auction.domain.repository.NormalAuctionRepository;
import com.avocado.normal.auction.domain.repository.NormalHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class NormalAuctionService {


    private final NormalHistoryRepository normalHistoryRepository;
    private final NormalAuctionRepository normalAuctionRepository;
    private final MemberRepository memberRepository;

    public NormalBidResponseDto doBid(NormalBidRequestDto normalBidRequestDto){
        /*
        입찰시간과 마감 시간 확인하기.
        * 입찰한 유저인지 조회
        *   O -> update
        *   X -> insert
        * */

        //입찰시간
        LocalDateTime bidNow = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        NormalAuction nowNormal = normalAuctionRepository.findById(normalBidRequestDto.getItemId()).orElse(null);
        log.info("bidNow : {} , auctionTime : {} ", bidNow , nowNormal.getEndAt().toLocalDateTime());
        if(bidNow.isAfter(nowNormal.getEndAt().toLocalDateTime())){
            return NormalBidResponseDto.builder()
                    .id(0L)
                    .lastBidAt(null)
                    .email(null)
                    .price(0)
                    .build();
        }

        // 해당 경매에 입찰 기록있는 유저인지 조회
        Optional<NormalHistory> userHistory = normalHistoryRepository.findByNormalAuction_IdAndMember_Id(normalBidRequestDto.getItemId(), normalBidRequestDto.getMemberId());

        if(userHistory.isPresent()){ // 있으면 업데이트
            log.info("들어오나ㅏㅏㅏㅏㅏ");
            userHistory.ifPresent(history->{
               history.setBidPrice(normalBidRequestDto.getPrice());
               normalHistoryRepository.saveAndFlush(history);
           });
        }else{ // 없으면 새로 insert
            Member nowMember = memberRepository.findById(normalBidRequestDto.getMemberId()).orElse(null);
            NormalHistory normalHistory = NormalHistory.builder()
                    .normalAuction(nowNormal)
                    .bidPrice(normalBidRequestDto.getPrice())
                    .member(nowMember)
                    .build();

            normalHistoryRepository.saveAndFlush(normalHistory);
        }
        //최고 입찰가
        NormalHistory topBid = normalHistoryRepository.findFirstByNormalAuction_IdOrderByBidPriceDescCreatedAtAsc(normalBidRequestDto.getItemId()).orElse(null);
        log.info("topBid : "+topBid);
        NormalBidResponseDto normalBidResponseDto = NormalBidResponseDto.builder()
                .id(topBid.getId())
                .lastBidAt(topBid.getCreatedAt().toLocalDateTime())
                .email(topBid.getMember().getEmail())
                .price(topBid.getBidPrice())
                .build();
        return normalBidResponseDto;
    }


}

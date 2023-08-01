package com.avocado.Item.controller;

import com.avocado.Item.controller.dto.*;
import com.avocado.Item.domain.entity.Type;
import com.avocado.Item.service.ItemService;
import com.avocado.member.service.AuthService;
import com.avocado.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    private final MemberService memberService;
    private final AuthService authService;

    // 위탁 요청 물품 등록
    @PostMapping("/consign")
    public ResponseEntity<Void> save(@RequestBody @Valid ConsignRequestDto consignRequestDto) {
        if (itemService.saveItem(consignRequestDto)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    };

    // 마이페이지 - 나의 위탁 물품 리스트 가져오기
    @GetMapping("/my-sale")
    public MySaleResponseDto mySales(@RequestHeader("Authorization") String requestAccessToken) {
        String email = authService.getPrincipal(authService.resolveToken(requestAccessToken));
        Long memberId = memberService.getMember(email).getId();

        return itemService.getMySales(memberId);
    }

    // 마이페이지 - 나의 위탁 물품 상세보기
    // TODO : 예외 처리에 대한 고민해보기, 어느 단에서 분기를 해야할지 고민해보기
    @GetMapping("/my-sale/{itemId}/{type}")
    public MySaleDetailResponseDto mySaleDetail(@PathVariable(name = "itemId") Long itemId, @PathVariable(name = "type")Type type) {
        
        if(type.equals("NORMAL")) {
            return itemService.getMyNormalSale(itemId);
        } else if (type.equals("LIVE")) {
            //return itemService.getMyLiveSale(itemId);
        }

        return null;
    }
    
    // 마이페이지 - 나의 입찰 상품 리스트 가져오기 (상시만)
    @GetMapping("/my-bid/{type}")
    public MyBidResponseDto myBids(@RequestHeader("Authorization") String requestAccessToken) {
        String email = authService.getPrincipal(authService.resolveToken(requestAccessToken));
        Long memberId = memberService.getMember(email).getId();

        return itemService.getMyNormalBids(memberId);
    }
    
    // 마이페이지 - 나의 낙찰 상품 리스트 가져오기
    @GetMapping("/my-success-bid/{type}")
    public MySuccessBidResponseDto mySuccessBid(@RequestHeader("Authorization") String requestAccessToken, @PathVariable(name = "type") Type type) {
        String email = authService.getPrincipal(authService.resolveToken(requestAccessToken));
        Long memberId = memberService.getMember(email).getId();

        if(type.equals("NORMAL")) {
            return itemService.getMyNormalSuccessBids(memberId);
        } else if (type.equals("LIVE")) {
            // 라이브 미구현
        }

        return null;
    }

}

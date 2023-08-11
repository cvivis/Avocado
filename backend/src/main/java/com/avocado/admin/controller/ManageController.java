package com.avocado.admin.controller;


import com.avocado.admin.controller.dto.live.BroadcastCreateDto;
import com.avocado.admin.controller.dto.live.BroadcastResponseDto;
import com.avocado.admin.controller.dto.consign.*;
import com.avocado.admin.controller.dto.normal.NormalItemApproveResponse;
import com.avocado.admin.controller.dto.normal.NormalItemAssignRequest;
import com.avocado.admin.service.AdminService;
import com.avocado.admin.service.ConsignManageService;
import com.avocado.admin.service.NormalManageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage/items")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class ManageController {

    private final ConsignManageService consignManageService;
    private final NormalManageService normalManageService;
    private final AdminService adminService;

    //요청온 물품 리스트 보기
    @GetMapping("/consign")
    public ResponseEntity<?> getConsignList(){
        ConsignItemResponse response = consignManageService.getConsignList();
        return ResponseEntity.ok().body(response);
    }

//    @GetMapping("/consign/{id}")
//        public ResponseEntity<?> getConsignItemDetail(@PathVariable Long id){
//            ConsignItemDetailResponse response = consignManageService.getConsignItemDetail(id);
//        return ResponseEntity.ok().body(response);
//    }

    //요청 -> 승인
    @PutMapping("/consign/{id}") // category 어케 보낼지
    public ResponseEntity<?> consignApprove(@PathVariable Long id , @RequestBody ConsignConfirmRequest consignConfirmRequest){
        ConsignConfirmResponse response = consignManageService.consignApprove(consignConfirmRequest);
        return ResponseEntity.ok().body(response);
    }

    //요청 -> 반려
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> consignReject(@PathVariable Long id){
        ConsignRejectResponse response = consignManageService.consignReject(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/normal/approve")
    public ResponseEntity<?> getNormalApproveList(){
        NormalItemApproveResponse response = normalManageService.getNormalApproveList();
        return ResponseEntity.ok().body(response);
    }

    //승인 -> 배정
    @PutMapping("/normal/approve/{id}")
    public ResponseEntity AssignNormalApproveItem(@PathVariable Long id, @RequestBody NormalItemAssignRequest normalItemAssignRequest){
        boolean success = normalManageService.AssignNormalApproveItem(id, normalItemAssignRequest);
        if(success){
            return new ResponseEntity(HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/normal/assign")
//    public ResponseEntity<?> getNormalAssignList(){
//        NormalItemAssignResponse response = normalManageService.getNormalAssignList();
//        return ResponseEntity.ok().body(response);
//    }

    //방송 편성 -> openvidu controller 로 이동


    //방송 편성 조회하기
    @GetMapping("/broadcast/{date}")
    public ResponseEntity<?> findBroadcastByDate(@PathVariable String date) {
        log.info("[ManageController findBroadcastsByDate] date : {}",date);
        List<BroadcastResponseDto> broadcastList = adminService.findByDate(date);
        if(CollectionUtils.isEmpty(broadcastList)) return ResponseEntity.ok().build();
        return ResponseEntity.ok().body(broadcastList);
    }

    //승인 상태인 라이브 경매 리스트
    @GetMapping("/live/approve")
    public ResponseEntity<?> approvedLiveItems(){
        return ResponseEntity.ok().body(adminService.findApprovedLiveItems());
    }

    @GetMapping("/live/auction/{broadcastId}")
    public ResponseEntity<?> findLiveAuctionByBroadcastId(@PathVariable Long broadcastId){
        return ResponseEntity.ok().body(adminService.findLiveAuctionByBroadcastId(broadcastId));
    }

    @PostMapping("/live/assign/{itemId}/{broadcastId}")
    public ResponseEntity<?> assignLiveAuctiontoBroadcast(@PathVariable Long itemId, @PathVariable Long broadcastId){
        if(adminService.assignLiveAuctionToBroadcast(itemId, broadcastId)) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

}

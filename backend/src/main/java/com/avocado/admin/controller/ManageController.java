package com.avocado.admin.controller;


import com.avocado.admin.controller.dto.consign.*;
import com.avocado.admin.controller.dto.normal.NormalItemApproveResponse;
import com.avocado.admin.controller.dto.normal.NormalItemAssignRequest;
import com.avocado.admin.controller.dto.normal.NormalItemAssignResponse;
import com.avocado.admin.service.ConsignManageService;
import com.avocado.admin.service.NormalManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ManageController {

    private final ConsignManageService consignManageService;
    private final NormalManageService normalManageService;
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

    @PutMapping("/consign/{id}") // category 어케 보낼지
    public ResponseEntity<?> consignApprove(@PathVariable Long id , @RequestBody ConsignConfirmRequest consignConfirmRequest){
        ConsignConfirmResponse response = consignManageService.consignApprove(consignConfirmRequest);
        return ResponseEntity.ok().body(response);
    }

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

    @PutMapping("/normal/approve/{id}")
    public ResponseEntity AssignNormalApproveItem(@PathVariable Long id, @RequestBody NormalItemAssignRequest normalItemAssignRequest){
        boolean success = normalManageService.AssignNormalApproveItem(id, normalItemAssignRequest);
        if(success){
            return new ResponseEntity(HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/normal/assign")
    public ResponseEntity<?> getNormalAssignList(){
        NormalItemAssignResponse response = normalManageService.getNormalAssignList();
        return ResponseEntity.ok().body(response);
    }

    //방송 편성 등록하기
    //방송 편성 조회하기
    //방송 편성 상세보기
    //라이브인 상세 상품 조회하기
    //승인 상품 라이브 등록하기

}

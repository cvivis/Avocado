package com.avocado.normal.board.domain.repository;

import com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto;
import com.avocado.normal.board.controller.dto.NormalResponseEntryDto;
import com.avocado.normal.board.domain.entity.Category;
import com.avocado.normal.board.domain.entity.Item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface NormalBoardRepository extends JpaRepository<Item, Long> {

    // save는 추후에

    // 전체 리스트 반환
    @Query("SELECT NEW com.avocado.normal.board.controller.dto.NormalResponseEntryDto(i.id, i.name, nh.bidPrice, i.hopePrice, a.start_at, a.end_at) " +
            "FROM item i " +
            "JOIN normalHistory nh ON i.id = nh.autionId " +
            "JOIN aution a ON a.id = nh.autionId")
    List<NormalResponseEntryDto> findAllItemList();

    // 검색 리스트 반환
    @Query("SELECT NEW com.avocado.normal.board.controller.dto.NormalResponseEntryDto(i.id, i.name, nh.bidPrice, i.hopePrice, a.start_at, a.end_at) " +
            "FROM item i " +
            "JOIN normalHistory nh ON i.id = nh.autionId " +
            "JOIN aution a ON a.id = nh.autionId " +
            "WHERE i.name LIKE :keyword") // 직접적인 와일드카드 작성 불가
    List<NormalResponseEntryDto> findByItemNameContains(@Param("keyword") String keyword);

    // 상세보기
    @Query("SELECT NEW com.avocado.normal.board.controller.dto.NormalItemDetailResponseDto(i.id, i.name, i.content, i.hopePrice, a.start_at, a.end_at) " +
            "FROM item i " +
            "JOIN aution a ON a.id = i.id " +
            "WHERE i.id = :id")
    NormalItemDetailResponseDto findDetailById(@Param("id") Long id);

    // 카테고리 리스트 보기
    @Query("SELECT NEW com.avocado.normal.board.controller.dto.NormalResponseEntryDto(i.id, i.name, nh.bidPrice, i.hopePrice, a.start_at, a.end_at) " +
            "FROM item i " +
            "JOIN normalHistory nh ON i.id = nh.autionId " +
            "JOIN aution a ON a.id = nh.autionId " +
            "WHERE i.category = :category") // 직접적인 와일드카드 작성 불가
    List<NormalResponseEntryDto> findAllByCategoryEquals(@Param("category") Category category);
}

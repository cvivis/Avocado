package com.avocado.normal.board.domain.repository;

import com.avocado.normal.board.domain.entity.Aution;
import com.avocado.normal.board.domain.entity.Category;
import com.avocado.normal.board.domain.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NormalBoardRepository extends JpaRepository<Item, Long> {

    // save는 추후에
    // 전체 리스트 findAll List 반환
//    Optional<List<Item>> findAllItems();

    // 카테고리별 리스트 findByCatogoryEquals(Category category) => List 반환
    Optional<List<Item>> findByCategoryEquals(String category);

    // 이름으로 검색 findContainsName
    Optional<List<Item>> findByNameContains(String keyword);

    // 하나 선택(상세에서 사용) findById => 객체 하나 반환
    Optional<Item> findById(Long id);

    Optional<Aution> findByItem_id(Long id);
}

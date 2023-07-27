package com.avocado.normal.board.domain.repository;

import com.avocado.normal.board.controller.dto.NormalResponseEntryDto;
import com.avocado.normal.board.domain.entity.Aution;
import com.avocado.normal.board.domain.entity.Category;
import com.avocado.normal.board.domain.entity.Item;
import com.avocado.normal.board.domain.entity.NormalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface NormalBoardRepository extends JpaRepository<NormalHistory, Long> {

    // save는 추후에
    // 전체 리스트 findAll List 반환
//    Optional<List<Item>> findAllItems();


    // 카테고리별 리스트 findByCatogoryEquals(Category category) => List 반환
//    Optional<List<NormalHistory>> findByCategoryEquals(String category);

    // 이름으로 검색 findContainsName



    @Query("SELECT NEW com.avocado.normal.board.controller.dto.NormalResponseEntryDto(i.id, i.name, nh.bidPrice, i.hopePrice, a.start_at, a.end_at) " +
            "FROM item i " +
            "JOIN normalHistory nh ON i.id = nh.autionId " +
            "JOIN aution a ON a.id = nh.autionId")
    List<NormalResponseEntryDto> findAllBy();




//    Optional<NormalResponseEntryDto> findAllBy();

//    Optional<List<NormalHistory>> findByItemNameContains(String keyword);

    // 하나 선택(상세에서 사용) findById => 객체 하나 반환
//    Optional<NormalHistory> findByItem_Id(Long id);

//    Optional<Aution> findByItem_id(Long id);
}

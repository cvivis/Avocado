package com.avocado.Item.domain.repository;

import com.avocado.Item.domain.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}

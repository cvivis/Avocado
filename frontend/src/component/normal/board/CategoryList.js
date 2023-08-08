import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoSelect, setSelectedCategory } from '../../../redux/categorySlice';
import { Select } from '@chakra-ui/react';
import { setFilterList } from '../../../redux/boardListSlice';

function CategoryList() {
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      dispatch(setDoSelect(false));
      dispatch(setSelectedCategory(''));
    } else {
      dispatch(setDoSelect(true));
      dispatch(setSelectedCategory(category));
      if (category === '') {
        dispatch(setDoSelect(false));
      };
    }
  }



  return (
    <div>
      <Select width='auto'
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value=''>카테고리</option>
        <option value='ELECTRONICS'
        >ELECTRONICS</option>

        <option value='HANDICRAFT'
        >HANDICRAFT</option>

        <option value='PETSUPPLIES'
        >PETSUPPLIES</option>

        <option value='CLOTHES'
        >CLOTHES</option>
      </Select>

    </div>
  );
}

export default CategoryList;

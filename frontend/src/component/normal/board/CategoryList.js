import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoSelect, setSelectedCategory } from '../../../redux/categorySlice';

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
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="ELECTRONICS"
          checked={selectedCategory === "ELECTRONICS"}
          onChange={() => handleCategoryChange("ELECTRONICS")}
        />
        ELECTRONICS
      </label>
      <label>
        <input
          type="checkbox"
          value="HANDICRAFT"
          checked={selectedCategory === "HANDICRAFT"}
          onChange={() => handleCategoryChange("HANDICRAFT")}
        />
        HANDICRAFT
      </label>
      <label>
        <input
          type="checkbox"
          value="PETSUPPLIES"
          checked={selectedCategory === "PETSUPPLIES"}
          onChange={() => handleCategoryChange("PETSUPPLIES")}
        />
        PETSUPPLIES
      </label>
      <label>
        <input
          type="checkbox"
          value="CLOTHES"
          checked={selectedCategory === "CLOTHES"}
          onChange={() => handleCategoryChange("CLOTHES")}
        />
        CLOTHES
      </label>

    </div>
  );
}

export default CategoryList;

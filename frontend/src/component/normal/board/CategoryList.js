import React, { useState } from 'react';
import api from '../../../api';


// 백엔드 category를 파라미터로 받도록 수정해야함

function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchLists, setSearchLists] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    // 확인 버튼을 누를 때 선택한 토글 값을 사용하여 API 호출
    api.get("/normal/list/sort-category")
      .then(response => {
        setSearchLists(response.data.entries);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  };

  return (
    <div>
      {/* 토글 선택 */}
      <label>
        <input
          type="radio"
          value="ELECTRONICS"
          checked={selectedCategory === 'ELECTRONICS'}
          onChange={() => handleCategoryChange('ELECTRONICS')}
        />
        ELECTRONICS
      </label>
      <label>
        <input
          type="radio"
          value="HANDICRAFT"
          checked={selectedCategory === 'HANDICRAFT'}
          onChange={() => handleCategoryChange('HANDICRAFT')}
        />
        HANDICRAFT
      </label>
      <label>
        <input
          type="radio"
          value="PETSUPPLIES"
          checked={selectedCategory === 'PETSUPPLIES'}
          onChange={() => handleCategoryChange('PETSUPPLIES')}
        />
        PETSUPPLIES
      </label>
      <label>
        <input
          type="radio"
          value="CLOTHES"
          checked={selectedCategory === 'CLOTHES'}
          onChange={() => handleCategoryChange('CLOTHES')}
        />
        CLOTHES
      </label>

      {/* 확인 버튼 */}
      <button onClick={handleSearch}>확인</button>

      {/* 검색 결과 출력 */}
      <ul>
        {searchLists.map((searchList) => (
          <li key={searchList.itemId}>
            {searchList.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

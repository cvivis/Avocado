import api from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setDoSelect, setSelectedCategory } from '../../../redux/categorySlice';
import { setBoardLists } from '../../../redux/boardListSlice';
// import { useState } from 'react';;
// 백엔드 category를 파라미터로 받도록 수정해야함 => 쿼리스트링으로 해결

function CategoryList() {
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  
  // const BoardLists = useSelector((state) => state.boardList.boardLists);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };
  // const handleOptionClick = () => {
  //   setModalIsOpen(true); // "옵션" 버튼을 누르면 모달 창을 열도록 상태 변경
  // };
  // const handleCloseModal = () => {
  //   setModalIsOpen(false); // 모달 창을 닫을 때 상태 변경
  // };

  const handleSearch = () => {
    dispatch(setDoSelect());
    // 확인 버튼을 누를 때 선택한 토글 값을 사용하여 API 호출
    api.get(`/normal/list/sort-category?category=${selectedCategory}`)
    .then(response => {
      dispatch(setBoardLists(response.data.entries));
    })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  };

  // const handleConfirm = () => {
  //   // 검색 실행 후 모달 닫기
  //   handleSearch();
  //   handleCloseModal();
  // };

  return (
    <div>
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
      {/* <button onClick={handleConfirm}>확인</button> */}

      

      {/* <ul>
        {BoardLists.map((BoardList) => (
          <li key={BoardList.itemId}>
            {BoardList.name}
          </li>
        ))}
      </ul> */}
      <button onClick={handleSearch}>확인</button>
    </div>
  );
}

export default CategoryList;

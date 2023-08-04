import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchKeyword } from "../../../redux/searchSlice";
import { setFilterList } from "../../../redux/boardListSlice";
import api from '../../../api';

function SearchList() {
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const dispatch = useDispatch();
  const doSelect = useSelector((state) => state.category.doSelect);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const boardList = useSelector((state) => state.boardList.boardList);

  const handleSearch = useCallback(() => {
    if (!doSelect && searchKeyword === '') {
      dispatch(setFilterList(boardList)); // 처음 리스트로 초기화
    } else {
      const categoryAPI = doSelect ? `/normal/list/sort-category?category=${selectedCategory}` : "/normal/list";
      api.get(categoryAPI)
        .then(response => {
          const filterList = response.data.entries.filter(item =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          dispatch(setFilterList(filterList));
        })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
    }
  }, [dispatch, doSelect, searchKeyword, selectedCategory, boardList]);

  const handleSearchInputChange = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  return (
    <div>
      <input
        type="search"
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearchButtonClick}>검색</button>
    </div>
  );
}

export default SearchList;

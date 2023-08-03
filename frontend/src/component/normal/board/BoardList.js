import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';
import { useDispatch, useSelector } from "react-redux";
import { setBoardLists } from "../../../redux/boardListSlice";
import { setSearchKeyword } from "../../../redux/searchSlice";
import CategoryList from "./CategoryList";

function BoardList() {

  // Redux store의 searchResults 가져오기
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  // const searchResults = useSelector((state) => state.search.searchResults);
  const boardLists = useSelector((state) => state.boardList.boardLists);
  const dispatch = useDispatch();
  const doSelect = useSelector((state) => state.category.doSelect);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  const [filteredList, setFilteredList] = useState([]);

  const handleSearch = () => {
    if (searchKeyword === '' && !doSelect) {
      // 검색어가 비어있을 때 전체 물품 리스트를 보여줌
      api.get("/normal/list")
        .then(response => {
          dispatch(setBoardLists(response.data.entries));
        })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
    } else if (searchKeyword !== '' && !doSelect) {
      // 검색어가 있을 때 검색 결과를 보여줌
      api.get(`/normal/list/search/${searchKeyword}`)
        .then(response => {
          dispatch(setBoardLists(response.data.entries));
        })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
    }

    else if (searchKeyword !== '' && doSelect) {
      // 검색어가 있을 때 검색 결과를 보여줌
      const filteredList = boardLists.filter(item =>
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredList(filteredList);
    }else{
      // 선택한 카테고리에 해당하는 API 호출
      api.get(`/normal/list/sort-category?category=${selectedCategory}`)
      .then(response => {
        dispatch(setBoardLists(response.data.entries));
      })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
    }
  };
  const handleSearchInputChange = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };


  useEffect(() => {
    // API 호출
    api.get("/normal/list")
      .then(response => {
        dispatch(setBoardLists(response.data.entries));
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, [dispatch, doSelect]);

  console.log(doSelect);
  return (
    <div>
      <CategoryList />
      <div>
        <input
          type="search"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <ul>
        <li>
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>상품명</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0
                ? filteredList.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.itemId}</td>
                    <td>
                      <Link to={`/normal/detail/${item.itemId}`}>{item.name}</Link>
                    </td>
                  </tr>
                ))
                : boardLists.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.itemId}</td>
                    <td>
                      <Link to={`/normal/detail/${item.itemId}`}>{item.name}</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  );
}

export default BoardList;

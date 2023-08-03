import React, { useEffect } from "react";
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

  const handleSearch = () => {
    if (searchKeyword === '') {
      // 검색어가 비어있을 때 전체 물품 리스트를 보여줌
      api.get("/normal/list")
        .then(response => {
          dispatch(setBoardLists(response.data.entries));
        })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
    } else {
      // 검색어가 있을 때 검색 결과를 보여줌
      api.get(`/normal/list/search/${searchKeyword}`)
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
  }, [dispatch]);


  return (
    <div>
      <CategoryList/>
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
              {boardLists.map((boardList) => (
                <tr key={boardList.itemId}>
                  <td>{boardList.itemId}</td>
                  <td>
                    <Link to={`/normal/detail/${boardList.itemId}`}>
                      {boardList.name}
                    </Link>
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

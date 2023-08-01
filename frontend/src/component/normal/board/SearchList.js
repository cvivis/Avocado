import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../../redux/searchSlice";

function SearchList() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.searchLists);

  const handleSearch = () => {     
    // 검색 버튼 클릭 시 API 호출
    api.get(`/normal/list/search/${searchKeyword}`)
      .then(response => {
        dispatch(setSearchResults(response.data.entries));
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  };

  return (
    <div>
      <input 
        type="search" 
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e)=> setSearchKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {searchResults.map((searchList) => (
          <li key={searchList.itemId}>
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>상품명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchList.itemId}</td>
                  <td>
                    <Link to={`/normal/detail/${searchList.itemId}`}>
                      {searchList.name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchList;

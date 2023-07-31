import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";

function SearchList() {

    const [searchKeyword,setSearchKeyword] = useState('');
    const [searchLists, setSearchLists] = useState([]);
    const navigate = useNavigate();
    const handleSearch = () => {
      
      navigate(`/normal/list/search/${searchKeyword}`);
      // 검색 버튼 클릭 시 API 호출
      api.get(`/normal/list/search/${searchKeyword}`)
        .then(response => {
          setSearchLists(response.data.entries);
        })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
      
    };

    return (
        <div><input type="search" placeholder="검색어를 입력하세요"
        onChange={(e)=> setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
        
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
              {searchLists.map((searchList) => (
                <tr key={searchList.itemId}>
                  <td>{searchList.itemId}</td>
                  <td>
                    <Link to={`/normal/detail/${searchList.itemId}`}>
                      {searchList.name}
                    </Link>
                  </td>
  
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Link to={`/normal/${boardList.id}`}>{boardList.name}</Link> */}
        </li>
      </ul>
      </div>
        

    );
}
export default SearchList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';

function BoardList() {
  // Redux store의 searchResults 가져오기
  const [boardLists,setBoardLists] = useState([]);

  useEffect(() => {
    // API 호출
    api.get("/normal/list")
      .then(response => {
        setBoardLists(response.data.entries);
        // do something with response.data.entries if needed
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, []);

  return (
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
            {boardLists.map((boardList) => ( // searchResults가 비어있지 않은 경우에만 map 함수 사용
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
  );
}

export default BoardList;

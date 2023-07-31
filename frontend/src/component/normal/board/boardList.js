import React, { useEffect, useState } from "react";
import api from '../../../api';
import { Link } from "react-router-dom";



function BoardList() {
  const [boardLists, setBoardLists] = useState([]);
  useEffect(() => {
    // API 호출
    api.get("/normal/list")
      .then(response => {
        setBoardLists(response.data.entries);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, []);

  console.log(boardLists);


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
        {/* <Link to={`/normal/${boardList.id}`}>{boardList.name}</Link> */}
      </li>
    </ul>

  );
}
export default BoardList;

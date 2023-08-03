import React, { useEffect, useState } from "react";
import api from '../../../api';
import { useParams } from "react-router-dom";
// import NormalBid from "../auction/normalBid";

function Detail() {
  // <NormalBid></NormalBid>
  const { id } = useParams();
  const [boardDetail, setboardDetail] = useState('');
  useEffect(() => {
    // API 호출
    api.get(`/normal/detail/${id}`)
      .then(response => {
        setboardDetail(response.data);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, [id]);



  return (
    <ul>
      <li>
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>상품명</th>
              <th>상품설명</th>
            </tr>
          </thead>
          <tbody>
            <tr key={boardDetail.itemId}>
              <td>{boardDetail.itemId}</td>
              <td>{boardDetail.name}</td>
              <td>{boardDetail.content}</td>
            </tr>
          </tbody>
        </table>
        {/* <Link to={`/normal/${boardList.id}`}>{boardList.name}</Link> */}
      </li>
    </ul>

  );
}
export default Detail;

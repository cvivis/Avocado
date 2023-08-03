import React, {useEffect,useState} from "react";
import api from '../../../api';
import { useParams } from "react-router-dom";
import TimeCheck from "../../../normalAuction/timeCheck";
import NormalBid from "../../../normalAuction/normalBid";



function Detail() {
  // const nowPrice = 10000;
  // const nowBidName = "홍길동";


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
      <div>
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
                  <td>
                    
                    {boardDetail.name}</td>
                    <td>{boardDetail.content}</td>
                    
                </tr>
              
            </tbody>
          </table>
            {/* <Link to={`/normal/${boardList.id}`}>{boardList.name}</Link> */}
        </li>
      </ul>
        <div>
          <NormalBid applyId="1" userId="1" normalAuctionId="1" nowPrice = {nowPrice} nowBidName={nowBidName}></NormalBid>
          <NormalBid applyId="1" userId="2" normalAuctionId="1" nowPrice = {nowPrice} nowBidName={nowBidName}></NormalBid>
          <NormalBid applyId="1" userId="3" normalAuctionId="1" nowPrice = {nowPrice} nowBidName={nowBidName}></NormalBid>
          <p>-------------------------------------------------</p>
        </div>
        </div>
    );
  }
  export default Detail;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';
import { useNavigate } from "react-router-dom";

function BroadcastList() {

  const [broadcastList,setBroadcastList] = useState([]);
  
  const navigate = useNavigate();
  const participate = (broadcast) => { // 방송 경로
    navigate("/broadcastTest" ,{state : {"broadcastId" : broadcast.id}});
  };

  useEffect(() => {
    api.get("/live/list")
      .then(response => {
        if(response.data.entries) setBroadcastList(response.data.entries)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, []);

  function getAuctionList(broadcast) {
    console.log(broadcast)
  }

  return (
    <div className="container">
        <div className="row">
            <table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>방송명</th>
                    <th>시작시간</th>
                    <th>방송참여</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                    {broadcastList.map((broadcast , i) => ( 
                        <tr key={broadcast.id}>
                            <td>{i+1}</td>
                            <td>{broadcast.title}</td>
                            <td>{broadcast.startAt}</td>
                            <td><button disabled={broadcast.status == false ? true : false} onClick={() => participate(broadcast)}>방송참여</button></td>
                            <td><button onClick={() => getAuctionList(broadcast)}>경매보기</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default BroadcastList;

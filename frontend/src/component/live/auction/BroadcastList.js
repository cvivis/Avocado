import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';
import { useNavigate } from "react-router-dom";
import { setBroadcastId } from "../../../redux/broadcastIdSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";


function BroadcastList(date) {
  const [broadcastList,setBroadcastList] = useState([]);
  const id = useSelector((state)=> state.broadcastId.broadcastId);
  const navigate = useNavigate();
  const participate = (broadcast) => { // 방송 경로
    navigate("/broadcastTest" ,{state : {"broadcastId" : broadcast.id}});
  };
  const dispatch = useDispatch();
  const dateForm = "YYYY-MM-DD";
  const liveForm= "YYYY-MM-DD HH:mm";
  const datejs = dayjs(date.value).format(dateForm);
  console.log(datejs);
  // const loadBroadcasts = (e) => {
  // }
  useEffect(() => {
    api.get(`manage/items/broadcast/` +datejs).then(response => {
      console.log(response)

      if(response.data) setBroadcastList(response.data)
      else{
        setBroadcastList([]);
        dispatch(setBroadcastId(0));
      
    }
    });
    // api.get("/live/list")
    //   .then(response => {
    //     if(response.data.entries) setBroadcastList(response.data.entries)
    //   })
    //   .catch(error => {
    //     console.error('API 요청 에러:', error);
    //   });
  }, [datejs]);
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
                      console.log(broadcast.startAt),
                        <tr key={broadcast.id}>
                            <td>{i+1}</td>
                            <td>{broadcast.title}</td>
                            <td>{dayjs(broadcast.startAt).format(liveForm)}</td>
                            <td><button disabled={broadcast.status == false ? false : true} onClick={() => participate(broadcast)}>방송참여</button></td>
                            <td><button onClick={() => {dispatch(setBroadcastId(broadcast.broadcastId)); console.log(broadcast)}}>상세 보기</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default BroadcastList;

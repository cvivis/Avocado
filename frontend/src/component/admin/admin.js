import { useState , useRef, useEffect} from 'react';
import api from '../../api';
import { useLocation } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from 'axios';

function Admin() {

  //요청 물품 목록 (승인 or 반려)
  const [consignItems, setConsignItems] = useState([]); //요청 물품 리스트
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/manage/items/consign`)
      .then(response => {
        const content = response.data.entries
        if(content)setConsignItems(content)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
      
  }, []);

  const setCategory = (event, item, arrIndex) => {
    const category = event.target.value;
    const tempItemList =  consignItems;
    tempItemList[arrIndex].category = category
    setConsignItems(tempItemList)
  }

  const approve = (item ,arrIndex) => {
    if(item.category === undefined || item.category === "") alert("카테고리 설정")
    else {
      api.put(`/manage/items/consign/`+item.itemId, {id : item.itemId, category : item.category})
      .then(response => {
        const content = response.data
        const tempItemList =  [];
        consignItems.forEach(element => {
          if(element.itemId !== content.id) {
            tempItemList.push(element)
          }
        });
        setConsignItems(tempItemList)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
    }
  }

  const reject = (item, arrIndex) => {
    api.put(`/manage/items/reject/`+item.itemId)
    .then(response => {
      const content = response.data
      const tempItemList =  [];
        consignItems.forEach(element => {
          if(element.itemId !== content.id) {
            tempItemList.push(element)
          }
        });
        setConsignItems(tempItemList)
    })
    .catch(error => {
      console.error('API 요청 에러:', error);
    });
  }


  //승인 상시 물품 리스트
  const [approveNormalItems, setApproveNormalItems] = useState([]); 

  useEffect(() => {
    api.get(`/manage/items/normal/approve`)
      .then(response => {
        const content = response.data.entries
        if(content) setApproveNormalItems(content)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
      
  }, [consignItems]);

  const setStartTime = (event, item, arrIndex) => {
    const tempItemList =  approveNormalItems;
    tempItemList[arrIndex].startAt = event.target.value
    setApproveNormalItems(tempItemList);
  }

  const setEndTime = (event, item, arrIndex) => {
    const tempItemList =  approveNormalItems;
    tempItemList[arrIndex].endAt = event.target.value
    setApproveNormalItems(tempItemList);
  }

  const assign = (item ,arrIndex) => {
    if(item.startAt === undefined || item.startAt === "" || item.endAt === undefined || item.endAt === "") alert("시간을 설정하십시오")
    else {
      api.put(`/manage/items/normal/approve/`+item.itemId, {startAt : item.startAt, endAt : item.endAt})
      .then(response => {
        const tempItemList =  [];
        approveNormalItems.forEach(element => {
          if(element.itemId !== item.itemId) {
            tempItemList.push(element)
          }
        });
        setApproveNormalItems(tempItemList)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
    }
  }

  //방송 편성하기
  const [broadcastInfo, setBroadcastInfo] = useState({title: "", introduce: "", startAt:""});

  const setBroadcastStartAt = (e) => {
    setBroadcastInfo((state) => ({...state, startAt : e.target.value}))
  }

  const setBroadcastTitle = (e) => {
    setBroadcastInfo((state) => ({...state, title : e.target.value}))
  }

  const setBroadcastIntroduce = (e) => {
    setBroadcastInfo((state) => ({...state, introduce : e.target.value}))
  }

  const createBroadcast = () => {
    if(broadcastInfo.startAt === "" || broadcastInfo.title === "" || broadcastInfo.introduce === "") alert("입력 미완료")
    else {
      api.post("/broadcast/init", broadcastInfo).then( response => {
        if(response.status === 200) {
          // console.log(response.status)
        }
        // else console.log(response.status)
      })
      setBroadcastInfo({title: "", introduce: "", startAt:""})
    }
  }

  //방송편성표
  const [currentBroadcastList, setCurrentBroadcastList] = useState([]);
  const dateForm = "YYYY-MM-DDtHH:mm:ss";

  const loadBroadcasts = (e) => {
    // console.log(e.target.value);
    api.get(`manage/items/broadcast/` + e.target.value).then(response => {
      if(response.data) setCurrentBroadcastList(response.data)
      else  setCurrentBroadcastList([])
    })
  }

  const sliceDate= (broadcast) => {
    const date = broadcast.startAt.substr(11,5)
    return (
      date
    )
  }

  const broadcastOnOff= (broadcast) => {
    let status = "OFF"
    if(broadcast.status) status = "ON"
    return (
      status
    )
  }

  const broadcastStart = (broadcast) => {
    api.put(`/manage/items/broadcast/on/`+broadcast.broadcastId)
      .then(response => {
        // console.log(response.status)
        navigate("/broadcastTest" ,{state : {"broadcastId" : broadcast.broadcastId}});
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
    
    //방송화면 이동하면 끄읏
  }

  const auctionListByBroadcast = (broadcast) => {
    setCurrentBroadcast(broadcast)
  }


  //선택된 방송 경매리스트
  const [currentBroadcast, setCurrentBroadcast] = useState({});
  const [currentBroadcastAuctionList, setCurrentBroadcastAuctionList] = useState([]);

  const [approvedLiveAuctionList, setApprovedLiveAuctionList] = useState([]); //승인 상태인 라이브 물품 리스트(초기화 문제 때문에 위쪽에 배치)
  
  useEffect(() => {
    if(Object.keys(currentBroadcast).length !== 0) {
      api.get(`/manage/items/live/auction/` + currentBroadcast.broadcastId)
      .then(response => {
        const content = response.data
        if(content) setCurrentBroadcastAuctionList(content)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
    }
      
  }, [currentBroadcast, approvedLiveAuctionList]);


  //승인 상태인 라이브 물품 리스트 및 배정
  useEffect(() => {
    if(Object.keys(currentBroadcast).length !== 0) {
      api.get(`/manage/items/live/approve`)
      .then(response => {
        const content = response.data
        if(content) setApprovedLiveAuctionList(content)
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
    }
      
  }, [consignItems, currentBroadcast]);

  const assignAuctionToBroadcast = (item) => {
    // console.log(item)
    // console.log(currentBroadcast)
    api.post(`/manage/items/live/assign/${item.itemId}/${currentBroadcast.broadcastId}`).then(response =>{
      // console.log(response.status)
      if(response.status === 200) {
        const tempItemlist = [];
        approvedLiveAuctionList.forEach(element => {
          if(element.itemId !== item.itemId) tempItemlist.push(element)
        });
        setApprovedLiveAuctionList(tempItemlist)
      }
    })
  }

  return (
    <div className="container">
      <h1>관리자 페이지</h1>

      <div className='row' style={{border : '1px solid black'}}>
        <h2>위탁 물품 목록</h2>
        <table>
          <thead>
          <tr>
              <th>번호</th>
              <th>물품명</th>
              <th>물품설명</th>
              <th>경매타입</th>
              <th>희망가</th>
              <th>카테고리</th>
              <th>버튼</th>
          </tr>
          </thead>
          <tbody>
            {consignItems.map((item , j) => (
              <tr key={j}>
                <td>{j+1}</td>
                <td>{item.name}</td>
                <td>{item.content}</td>
                <td>{item.auctionType}</td>
                <td>{item.hopePrice}</td>
                <td>
                  <select onChange={(event) => setCategory(event, item, j)}>
                    <option value="">카테고리 설정</option>
                    <option value="ELECTRONICS">전자기기</option>
                    <option value="HANDICRAFT">수공예품</option>
                    <option value="PETSUPPLIES">애완용품</option>
                    <option value="CLOTHES">의류</option>
                  </select>
                </td>
                <td>
                  <button onClick={()=> approve(item, j)}>승인</button>
                  <button onClick={()=> reject(item, j)}>반려</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='row' style={{border : '1px solid black'}}>
        <h2>상시 경매 승인 리스트</h2>
        <table>
          <thead>
          <tr>
              <th>번호</th>
              <th>물품명</th>
              <th>물품설명</th>
              <th>희망가</th>
              <th>카테고리</th>
              <th>시작시간</th>
              <th>종료시간</th>
              <th>배정</th>
          </tr>
          </thead>
          <tbody>
            {approveNormalItems.map((item , j) => (
              <tr key={j}>
                <td>{j+1}</td>
                <td>{item.name}</td>
                <td>{item.content}</td>
                <td>{item.hopePrice}</td>
                <td>{item.category}</td>
                <td>
                  <input type='datetime-local' onChange={(event) => setStartTime(event, item, j)}></input>
                </td>
                <td>
                  <input type='datetime-local' onChange={(event) => setEndTime(event, item, j)}></input>
                </td>
                <td>
                  <button onClick={()=> assign(item, j)}>배정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className='row' style={{border : '1px solid black'}}>
        <h2>방송 편성하기</h2>
        <input type='datetime-local' value={broadcastInfo.startAt} placeholder='방송시간' onChange={(event) => setBroadcastStartAt(event)}></input>
        <input placeholder='방송제목' value={broadcastInfo.title} onChange={(event) => setBroadcastTitle(event)}></input>
        <input placeholder='방송소개' value={broadcastInfo.introduce} onChange={(event) => setBroadcastIntroduce(event)}></input>
        <button onClick={createBroadcast}>방송 편성</button>
      </div>
 
      <div className='row' style={{border : '1px solid black', display:'flex'}}>
        <div style={{border : '1px solid black', width:'50%'}}>
          <h2>방송 편성표</h2>
          <input type='date' onChange={(event) => loadBroadcasts(event)}></input>
          <table>
            <thead>
            <tr>
                <th>번호</th>
                <th>방송명</th>
                <th>방송소개</th>
                <th>시작시간</th>
                <th>진행상황</th>
                <th>시작</th>
                <th>경매목록보기</th>
            </tr>
            </thead>
            <tbody>
              {currentBroadcastList.map((broadcast , j) => (
                <tr key={j}>
                  <td>{j+1}</td>
                  <td>{broadcast.title}</td>
                  <td>{broadcast.introduce}</td>
                  <td>{sliceDate(broadcast)}</td>
                  <td>{broadcastOnOff(broadcast)}</td>
                  <td>
                    <button disabled={broadcast.status ? true : false} onClick={() => broadcastStart(broadcast)}>방송시작</button>
                  </td>
                  <td>
                    <button onClick={() => auctionListByBroadcast(broadcast)}>경매보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{border : '1px solid black', width:'25%'}}>
          <h2>선택 방송 : {currentBroadcast.title} / 경매 리스트</h2>
          <table>
            <thead>
            <tr>
                <th>번호</th>
                <th>물품명</th>
                <th>카테고리</th>
            </tr>
            </thead>
            <tbody>
              {currentBroadcastAuctionList.map((auction , j) => (
                <tr key={j}>
                  <td>{j+1}</td>
                  <td>{auction.name}</td>
                  <td>{auction.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{border : '1px solid black', width:'25%'}}>
          <h2>배정 가능한 경매 리스트</h2>
          <table>
            <thead>
            <tr>
                <th>번호</th>
                <th>물품명</th>
                <th>카테고리</th>
                <th>배정</th>
            </tr>
            </thead>
            <tbody>
              {approvedLiveAuctionList.map((item , j) => (
                <tr key={j}>
                  <td>{j+1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td><button onClick={()=> assignAuctionToBroadcast(item)}>배정</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;

import { useState , useRef, useEffect} from 'react';
import api from '../../api';
import { useLocation } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Admin() {

  //요청 물품 목록 (승인 or 반려)
  const [consignItems, setConsignItems] = useState([]); //요청 물품 리스트

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
  const [approveNormalItems, setApproveNormalItems] = useState([]); //요청 물품 리스트
  const dateForm = "YYYY-MM-DD HH:mm:ss";
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
      
      <div className='row' style={{border : '1px solid black', display:'flex'}}>
        
        <div style={{border : '1px solid black', width:'33%'}}>
          <h2>방송 편성</h2>
        </div>
        <div style={{border : '1px solid black', width:'33%'}}>
          <h2>선택된 방송 경매 리스트</h2>
        </div>
        <div style={{border : '1px solid black', width:'33%'}}>
          <h2>승인 경매 리스트</h2>
        </div>
      </div>
    </div>
  );
}

export default Admin;

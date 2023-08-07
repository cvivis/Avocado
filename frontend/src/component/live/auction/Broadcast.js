import { useState , useRef, useEffect} from 'react';
import api from '../../../api';
import { useLocation } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';


function Broadcast() {
  const [auctionList, setAuctionList] = useState([]); //경매리스트
  const [currentAuction, setCurrentAuction] = useState({}); //선택한 경매 
  const location = useLocation();
  const broadcastId = useRef(0); //현재참여중인 방송id 
  const client  = useRef({}); //websocket client
  const userinfo = {"email" : "ssafy"} // TODO : 로그인한 값으로 수정
  const bidPrice = useRef(0); //입찰가격 input
  const [bidResponse, setBidResponse] = useState({}); //ws으로 받은 입찰응답
  const [chatHistory, setChatHistory] = useState([]); //전체채팅기록
  const currentChat = useRef(""); //채팅메세지 input
  const [chatResponse, setChatResponse] = useState({}); //ws으로 받은 채팅응답
  const [auctionOnAndOff, setAuctionOnAndOff] = useState({});


  useEffect(() => {
    console.log(location.state.broadcastId)
    broadcastId.current = location.state.broadcastId;
    api.get(`/live/list/${broadcastId.current}/info`)
      .then(response => {
        const list = response.data.entries
        console.log(list)
        if(list) {
          setAuctionList(list)
          setCurrentAuction(list[0])
        }
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
      
  }, []);

  useEffect(() => {
    connect(); // 마운트시 실행
    return () => disconnect(); // 언마운트 시 실행
  },[]);

  useEffect(() => {
    if(bidResponse.status) {
      const tempAuction = currentAuction
      tempAuction.currentMemberEmail = bidResponse.bidMemberEmail
      tempAuction.highestPrice = bidResponse.bid_price
      setCurrentAuction(tempAuction)
      setBidResponse({});
    }
  }, [bidResponse]);

  useEffect(() => {

    // setChatResponse({})
    setChatHistory((prev) => [...prev, chatResponse])
    // if(chatResponse) setChatResponse({})
  }, [chatResponse]);

  useEffect(() => {
    console.log(auctionOnAndOff)
    if(auctionOnAndOff.onAndOff === 1) {
      setChatResponse({sender : "SYSTEM", message : `${auctionOnAndOff.title} 경매가 시작되었습니다`})

      const tempAuctionList = auctionList;
      const findIndex = tempAuctionList.findIndex(element => element.auctionId === auctionOnAndOff.auctionId)
      tempAuctionList[findIndex].status = 1
      setAuctionList(tempAuctionList)

      setAuctionOnAndOff({})
    }
    else if(auctionOnAndOff.onAndOff === 2) {
      setChatResponse({sender : "SYSTEM", message : `${auctionOnAndOff.title} 경매가 종료되었습니다`})

      const tempAuctionList = auctionList;
      const findIndex = tempAuctionList.findIndex(element => element.auctionId === auctionOnAndOff.auctionId)
      tempAuctionList[findIndex].status = 2
      setAuctionList(tempAuctionList)

      setAuctionOnAndOff({})
    }
  }, [auctionOnAndOff]);



  const disconnect = () => {
      client.current.deactivate(); // 활성화된 연결 끊기 
  };
  

  const connect = () =>{
    client.current = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/live-auction',
        onConnect:() =>{
          console.log('소켓 연결 성공')
          subcribe();
        },
    });
    client.current.activate();
  }


  const subcribe = () => {
    //입찰
    client.current.subscribe("/sub/auction/bid/" + broadcastId.current, response => {
      const content = JSON.parse(response.body)
      setBidResponse(content)
    });

   //방송 종료
    client.current.subscribe("/sub/broadcast/off/" + broadcastId.current, response => {
      const content = JSON.parse(response.body)
      console.log(content)
    });

   //경매 온오프
    client.current.subscribe("/sub/auction/status/" + broadcastId.current, response => {
      const content = JSON.parse(response.body)
      setAuctionOnAndOff(content)
    });

    //채팅
    client.current.subscribe("/sub/chat/" + broadcastId.current, response => {
      const content = JSON.parse(response.body)
      setChatResponse(content)
    });
 }

  function status(auction) {
    const auctionStatus = auction.status;
    let toString;
    if(auctionStatus === 0) toString = "경매 전"
    else if(auctionStatus === 1) toString ="진행 중"
    else toString = "종료"
    return (
      <span>{toString}</span>
    )
  }

  const bid = (currentAuction) =>  {
    const price = bidPrice.current;
    if(price > currentAuction.startPrice && price > currentAuction.highestPrice) {
      client.current.publish({ destination: "/pub/auction/bid", body: JSON.stringify({auctionId : currentAuction.auctionId, bid_price : price, bidMemberEmail : userinfo.email, broadcastId : broadcastId.current}) });
    }
    else {
      alert("입찰가를 확인하십시오")
    }
    
  }

  const bidChange = (e) => {
    bidPrice.current = e.target.value;
  };

  const chatChange = (e) => {
    currentChat.current = e.target.value;
  }

  const sendChat = () => {
    client.current.publish({ destination: "/pub/chat", body: JSON.stringify({broadcastId : broadcastId.current, sender : userinfo.email, message : currentChat.current})});
  }
  
  const displayChat = (chats) => {
    let result = [];
    for(let i of chats) {
      if(i.sender) result.push(<div>{i.sender} : {i.message}</div>)
    }
    return result;
  }

  //임시 어드민 기능 : 경매 시작
  const start = () => {
    client.current.publish({ destination: "/pub/auction/status", body: JSON.stringify({broadcastId : broadcastId.current, auctionId : currentAuction.auctionId, onAndOff : 1})});
  }

  //임시 어드민 기능 : 경매 종료
  const stop = () => {
    client.current.publish({ destination: "/pub/auction/status", body: JSON.stringify({broadcastId : broadcastId.current, auctionId : currentAuction.auctionId, onAndOff : 2})});
  }

  //임시 어드민 기능 : 방송 종료
  const broadcastOff = () => {

  }

  return (
    <div className="container">
      <div className='row'  style={{display:'flex', height:'500px'}}>
        <div style={{width:'75%', border : '1px solid black'}}>방송화면삽입</div>
        <div style={{width:'25%', border : '1px solid black', position:'relative'}}>
          <div style={{ height:'500px', overflow:'auto'}}>{displayChat(chatHistory)}</div>
          <div style={{position:'absolute', bottom:'0'}}>
            <input onChange={chatChange}></input>
            <button onClick={() => sendChat()}>보내기</button>
          </div>
        </div>
      </div>
        <div className="row" style={{display:'flex'}}>
          <div style={{width:'25%', border : '1px solid black'}}>
            {auctionList.map((auction , i) => (
              <div style={{border : '1px solid black'}} onClick={() => setCurrentAuction(()=> auction)}>
                {auction.itemName} {status(auction)}
              </div>
              ))}
          </div>
          <div style={{width:'50%', border : '1px solid black'}}>
            {/* 선택한 경매 상세정보 */}
            <ul>
              <li>제품명 : {currentAuction.itemName}</li>
              <li>진행상황 : {status(currentAuction)}</li>
              <li>시작가 : {currentAuction.startPrice}</li>
              <li>현재최고입찰가 : {currentAuction.highestPrice}</li>
              <li>현재최고입찰자 : {currentAuction.currentMemberEmail}</li>
            </ul>
          </div>
          <div style={{width:'25%', border : '1px solid black'}}>
            <div>{currentAuction.itemName} : {status(currentAuction)}</div>
            <input type="number" onChange={bidChange}></input>
            <button disabled={currentAuction.status === 1 ? false : true} onClick={() => bid(currentAuction)}>입찰</button>
          </div>        
        </div>
        <div className='row' style={{marginTop: '20px'}}>
          <div>임시 어드민 기능</div>
          <button onClick={() => start(currentAuction)}>경매시작</button>
          <button onClick={() => stop(currentAuction)}>경매종료</button>
          <button onClick={() => broadcastOff()}>방송종료</button>
        </div>
    </div>
  );
}

export default Broadcast;

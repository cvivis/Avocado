import '../App.css';
import { useState , useRef, useEffect} from 'react';
import * as StompJs from '@stomp/stompjs';



function NormalBid(){
  const nowBidName = useRef("홍길동");
  // const [ hopePrice , setHopePrice] = useState(10000);
  const [stateChanger,setStateChanger] = useState(true);
  const [hopePrice,setHopePrice] = useState(10000);
  const nowPrice = useRef(hopePrice);
  const myPrice= useRef(nowPrice.current);
  const applyId = 2;
  function handleBid(){
    setStateChanger(!stateChanger);
    nowPrice.current = myPrice.current;
    myPrice.current = (nowPrice.current + nowPrice.current* 0.1);
    publish();
  }

/*stomp 관련 */


  const client = useRef({});
  const connect = () =>{
      client.current = new StompJs.Client({
          brokerURL: 'ws://localhost:8080/ws/chat',
          onConnect:() =>{
             // Do something, all subscribes must be done is this callback
            console.log("연결 SUB");
              subscribe();
          },
      });
      client.current.activate();
  }
  useEffect(() => {
    connect(); // 마운트시 실행
    return () => disconnect(); // 언마운트 시 실행
  },[]);


  const disconnect = () => {
      client.current.deactivate(); // 활성화된 연결 끊기 
  };

  const subscribe = () => {
      client.current.subscribe('/sub/normal/' + applyId, (res) => { // server에게 메세지 받으면
        const json_body = JSON.parse(res.body);
        console.log(json_body);
        myPrice.current = json_body.price;
        nowBidName.current = json_body.email;
      });
    };

    const publish = () =>{
      client.current.publish({
        destination: '/pub/normal/' + applyId,
        body:JSON.stringify( {id:applyId, price:myPrice.current , memberId:1, itemId:1}),
        skipContentLengthHeader: true,
      });
      
    }

// There is an option to skip content length header


  return (
    <div className="App">
      <p>희망 가격: {hopePrice}</p>
      <p>현재 입찰자 {nowBidName.current}</p>
      <p>현재 입찰가 : {nowPrice.current}</p>
      <p>내 입찰가 : {myPrice.current}</p>

      <button onClick={handleBid}> 입찰 </button>
      <p>---------------------------------</p>
    </div>
  );

}

export default NormalBid;

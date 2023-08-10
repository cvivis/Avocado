// import { useState , useRef, useEffect} from 'react';
// import * as StompJs from '@stomp/stompjs';
// import * as BeforeNormalBid from "./brforeNormalBid";



// function NormalBid(props){
//   const [stateChanger,setStateChanger] = useState(true);
//   const [hopePrice,setHopePrice] = useState(10000);
//   const [bidInfo, setBidInfo] = useState({
//     nowPrice : props.nowPrice,
//     myPrice : props.nowPrice + BeforeNormalBid.setBidPlus(props.nowPrice),
//     nowBidName : props.nowBidName
//   })
//   const applyId = props.applyId;

//   //입찰버튼
//   function handleBid(){
//     let nowBidUnit = BeforeNormalBid.setBidUnit(bidInfo.nowPrice);
//     console.log(nowBidUnit);
//     publish();
//   }

// /*stomp 관련 */
//   const client = useRef({});
//   const connect = () =>{
//       client.current = new StompJs.Client({
//           brokerURL: 'ws://localhost:8080/ws/chat',
//           onConnect:() =>{
//              // Do something, all subscribes must be done is this callback
//             console.log("연결 SUB");
//               subscribe();
//           },
//       });
//       client.current.activate();
//   }

//   useEffect(() => {
//     connect(); // 마운트시 실행

//     return () => disconnect(); // 언마운트 시 실행
//   },[]);




//   const disconnect = () => {
//       client.current.deactivate(); // 활성화된 연결 끊기 
//   };

//   const subscribe = () => {
//     client.current.subscribe('/sub/normal/' + applyId, (res) => { // server에게 메세지 받으면
//       console.log("들어왔당.")
//       const jsonBody = JSON.parse(res.body);
//       console.log(jsonBody);
//       setBidInfo((prevState) =>{
//         return {...bidInfo,nowPrice:jsonBody.price , myPrice:jsonBody.price + BeforeNormalBid.setBidPlus(jsonBody.price) , nowBidName :jsonBody.email}
//       });
//   } )
// };


//     const publish = () =>{
//       client.current.publish({
//         destination: '/pub/normal/' + applyId,
//         body:JSON.stringify( {id:applyId, price:bidInfo.myPrice , memberId:props.userId, itemId:props.normalAuctionId}),
//         skipContentLengthHeader: true,
//       });
      
//     }

// // There is an option to skip content length header


//   return (
//     <div className="App">
//       <p>내 아이디 : {props.userId}</p>
//       <p>희망 가격: {BeforeNormalBid.setBidUnit(hopePrice)}</p>
//       <p>현재 입찰자 {bidInfo.nowBidName}</p>
//       <p>현재 입찰가 : {BeforeNormalBid.setBidUnit(bidInfo.nowPrice)}</p>
//       <p>내 입찰가 : {BeforeNormalBid.setBidUnit(bidInfo.myPrice)}</p>


//       <button onClick={handleBid}> 입찰 </button>
//       {/* <p>---------------------------------</p> */}
//     </div>
//   );

// }

// export default NormalBid;

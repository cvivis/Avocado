
export function setBidPlus(nowPrice) { // 호가 설정하는 함수
  let upUnit = 1000;
  let splitUnit = 10000;
  let unit = nowPrice / splitUnit;
  if (unit < 10) {
    return upUnit;
  }
  else if (unit >= 10 && unit < 100) {
    return upUnit * 10;
  }
  else if (unit >= 100 && unit < 1000) {
    return upUnit * 100;
  }
  else return upUnit * 1000 //호가 백만 원 맥스 
}

// 가격 한글 화
export function setBidUnit(price) {
  let unitWords = ['','만 ', '억 ', '조 ',];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount; i++) {
    let unitResult = (price % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}


// import React from "react";
// import {
//     Box, Divider, HStack, Heading, Flex, Spacer, Button, Text,
// } from '@chakra-ui/react';
// import { TimeIcon } from "@chakra-ui/icons";
// import { right } from "@popperjs/core";
// import { useState, useRef, useEffect } from 'react';
// import * as StompJs from '@stomp/stompjs';
// import * as BeforeNormalBid from '../component/normal/auction/beforeNormalBid';
// import TimeCheck from '../component/normal/auction/timeCheck';

// function MyBidInfo(props) {

//     const [stateChanger, setStateChanger] = useState(true);
//     const [hopePrice, setHopePrice] = useState(10000);
//     const [bidInfo, setBidInfo] = useState({
//         nowPrice: props.nowPrice,
//         myPrice: props.nowPrice + BeforeNormalBid.setBidPlus(props.nowPrice),
//     })
//     const applyId = props.applyId;

//     //입찰버튼
//     function handleBid() {
//         let nowBidUnit = BeforeNormalBid.setBidUnit(bidInfo.nowPrice);
//         let newNowPrice = bidInfo.nowPrice + 1000; // 현재가에 1000원을 더함
//         let newMyPrice = newNowPrice + 1000; // 내 입찰가는 현재가보다 1000원 더 높게 설정
//         console.log(nowBidUnit);

//         setBidInfo({
//             nowPrice: newNowPrice,
//             myPrice: newMyPrice
//         });

//         publish();
//     }

//     /*stomp 관련 */
//     const client = useRef({});
//     const connect = () => {
//         client.current = new StompJs.Client({
//             brokerURL: 'ws://localhost:8080/ws/chat',
//             onConnect: () => {
//                 // Do something, all subscribes must be done is this callback
//                 console.log("연결 SUB");
//                 subscribe();
//             },
//         });
//         client.current.activate();
//     }

//     useEffect(() => {
//         connect(); // 마운트시 실행

//         return () => disconnect(); // 언마운트 시 실행
//     }, []);




//     const disconnect = () => {
//         client.current.deactivate(); // 활성화된 연결 끊기
//     };

//     const subscribe = () => {
//         client.current.subscribe('/sub/normal/' + applyId, (res) => { // server에게 메세지 받으면
//             console.log("들어왔당.")
//             const jsonBody = JSON.parse(res.body);
//             console.log(jsonBody);
//             setBidInfo((prevState) => {
//                 return { ...bidInfo, nowPrice: jsonBody.price, myPrice: jsonBody.price + BeforeNormalBid.setBidPlus(jsonBody.price), nowBidName: jsonBody.email }
//             });
//         })
//     };


//     const publish = () => {
//         client.current.publish({
//             destination: '/pub/normal/' + applyId,
//             body: JSON.stringify({ id: applyId, price: bidInfo.myPrice, memberId: props.userId, itemId: props.normalAuctionId }),
//             skipContentLengthHeader: true,
//         });

//     }


//     return (
//         <Box>
//             <Heading size={'2xl'}>
//                 {props.name}
//             </Heading>
//             <Divider mt={'20px'} border={'1px'} color={'green'} w={'580px'} />
//             <HStack mt={'20px'}>
//                 <Heading size={'lg'} textAlign={'left'}>
//                     시작가
//                 </Heading>
//                 <Spacer />
//                 <Heading size={'lg'} textAlign={'right'}>
//                     {hopePrice}원 {/* 여기에 시작가 프롭스 */}
//                 </Heading>
//             </HStack>
//             <HStack mt={'20px'}>
//                 <Heading size={'lg'} textAlign={'left'}>
//                     현재가
//                 </Heading>
//                 <Spacer />
//                 <Heading size={'lg'} textAlign={'right'}>
//                     {bidInfo.nowPrice}원 {/* 여기에 현재가 프롭스 */}
//                 </Heading>
//             </HStack>
//             <HStack mt={'20px'}>
//                 <Heading size={'lg'} textAlign={'left'}>
//                     내 입찰가
//                 </Heading>
//                 <Spacer />
//                 <Heading size={'lg'} textAlign={'right'}>
//                     {BeforeNormalBid.setBidUnit(bidInfo.myPrice)}원 {/* 여기에 희망가 프롭스 */}
//                 </Heading>
//             </HStack>
//             <Divider mt={'20px'} border={'1px'} color={'green'} w={'580px'} />
//             <HStack mt={'20px'}>
//                 <Heading size={'lg'} textAlign={'left'}>
//                     남은 시간
//                 </Heading>
//                 <Spacer />
//                 <TimeIcon boxSize={6} />
//                 <Heading size={'lg'} textAlign={'right'}>
//                     <TimeCheck></TimeCheck>

//                 </Heading>
//             </HStack>
//             <HStack>
//                 <Spacer />
//                 <Button onClick={handleBid} size={'lg'} mt={'20px'} bg={'green.500'} color={'whiteAlpha.900'} _hover={{ bg: 'green' }} w={'300px'}> {/* 여기에 입찰 기능 버튼 */}
//                     <Text textAlign={'left'}>
//                         입찰하기
//                     </Text>
//                     <Spacer />
//                     <Text textAlign={'right'}>
//                         {BeforeNormalBid.setBidUnit(bidInfo.myPrice)} 원
//                     </Text>
//                 </Button>
//             </HStack>
//         </Box>
//     )
// }

// export default MyBidInfo;
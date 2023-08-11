import React from "react";
import {
    Box, Divider, HStack, Heading, Flex, Spacer, Button, Text,
} from '@chakra-ui/react';
import { TimeIcon } from "@chakra-ui/icons";
import { right } from "@popperjs/core";
import { useState, useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import * as BeforeNormalBid from '../component/normal/auction/beforeNormalBid';
import TimeCheck from '../component/normal/auction/timeCheck';
import { useSelector } from "react-redux";

function MyBidInfo(props) {
    const email = useSelector((state)=>state.login.email);
    const nowP = props.boardDetail.price;
    const mPrice =  props.boardDetail.price + BeforeNormalBid.setBidPlus(props.boardDetail.price);

    console.log(nowP +"이건 nowP");
    const [bidInfo, setBidInfo] = useState({
        nowPrice : "",
        myPrice :  ""
    })
    console.log(bidInfo.myPrice);
    const auctionId = props.boardDetail.auctionId;

    //입찰버튼
    function handleBid() {
        let nowBidUnit = BeforeNormalBid.setBidUnit(bidInfo.nowPrice);
        // console.log("asdfasdff "+bidInfo.nowPrice);
        // let newNowPrice = bidInfo.nowPrice; // 현재가에 1000원을 더함
        // let newMyPrice = newNowPrice; // 내 입찰가는 현재가보다 1000원 더 높게 설정
        // console.log(nowBidUnit);

        // setBidInfo({
        //     nowPrice: newNowPrice,
        //     myPrice: newMyPrice
        // });

        publish();
    }

    /*stomp 관련 */
    const client = useRef({});
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://i9a407.p.ssafy.io/ws/normal-auction',
            onConnect: () => {
                // Do something, all subscribes must be done is this callback
                console.log("연결 SUB");
                subscribe();
            },
        });
        client.current.activate();
    }

    useEffect(() => {
        setBidInfo( { nowPrice:nowP, myPrice:mPrice});
        connect(); // 마운트시 실행
        // console.log(bidInfo.nowPrice + " 황시은");
        // const auctionId = props.boardDetail.auctionId;
        return () => disconnect(); // 언마운트 시 실행
    }, [nowP]);




    const disconnect = () => {
        client.current.deactivate(); // 활성화된 연결 끊기 
    };

    const subscribe = () => {
        // console.log("야 들어왔냐")
        console.log(auctionId + "옥션아이디")
        console.log(bidInfo.nowPrice);
        client.current.subscribe('/sub/normal/' + auctionId, (res) => { // server에게 메세지 받으면
            console.log("들어왔당.")
            const jsonBody = JSON.parse(res.body);
            console.log(jsonBody);
            setBidInfo((prevState) => {
                console.log( "호가: "+BeforeNormalBid.setBidPlus(jsonBody.price));
                return { ...prevState, nowPrice: jsonBody.price, myPrice: jsonBody.price + BeforeNormalBid.setBidPlus(jsonBody.price), nowBidName: jsonBody.email }
            });
        })
    };


    const publish = () => {
        console.log("in Pub"+bidInfo.myPrice);
        client.current.publish({
            destination: '/pub/normal/' + auctionId,
            body: JSON.stringify({ id: auctionId, price: bidInfo.myPrice, email : email, itemId: props.boardDetail.itemId }),
            skipContentLengthHeader: true,
        });

    }


    return (
        <Box>
            <Heading size={'2xl'}>
                {props.boardDetail.name}
            </Heading>
            <Divider mt={'20px'} border={'1px'} color={'green'} w={'580px'} />
            <HStack mt={'20px'}>
                <Heading size={'lg'} textAlign={'left'}>
                    시작가
                </Heading>
                <Spacer />
                <Heading size={'lg'} textAlign={'right'}>
                    {props.boardDetail.hopePrice}원 {/* 여기에 시작가 프롭스 */}
                </Heading>
            </HStack>
            <HStack mt={'20px'}>
                <Heading size={'lg'} textAlign={'left'}>
                    현재가
                </Heading>
                <Spacer />
                <Heading size={'lg'} textAlign={'right'}>
                {BeforeNormalBid.setBidUnit(bidInfo.nowPrice)}원
                </Heading>
            </HStack>

            <Divider mt={'20px'} border={'1px'} color={'green'} w={'580px'} />
            <HStack mt={'20px'}>
                <Heading size={'lg'} textAlign={'left'}>
                    남은 시간
                </Heading>
                <Spacer />
                <TimeIcon boxSize={6} />
                <Heading size={'lg'} textAlign={'right'}>
                    {/* <TimeCheck endAt = {props.boardDetail.endAt}></TimeCheck> */}

                </Heading>
            </HStack>
            <HStack>
                <Spacer />
                <Button onClick={handleBid} size={'lg'} mt={'20px'} bg={'green.500'} color={'whiteAlpha.900'} _hover={{ bg: 'green' }} w={'300px'}> {/* 여기에 입찰 기능 버튼 */}
                    <Text textAlign={'left'}>
                        입찰하기
                    </Text>
                    <Spacer />
                    <Text textAlign={'right'}>
                        {BeforeNormalBid.setBidUnit(bidInfo.myPrice)} 원
                    </Text>
                </Button>
            </HStack>
        </Box>
    )
}

export default MyBidInfo;




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
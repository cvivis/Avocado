import React from "react";
import {
    Badge,
    Box, Button, Center, Divider, Flex, Grid, GridItem, 
    HStack, 
    Heading, Input, InputGroup, InputRightAddon, InputRightElement, List, ListIcon, ListItem, Spacer, Text, VStack,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import MyVideo from "../../../common/MyVideo";
// 기존
import { useState , useRef, useEffect} from 'react';
import api from '../../../api';
import { useLocation } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Broadcast() {

const [auctionList, setAuctionList] = useState([]); //경매리스트
const [currentAuction, setCurrentAuction] = useState({}); //선택한 경매 
const location = useLocation();
const broadcastId = useRef(0); //현재참여중인 방송id 
const client  = useRef({}); //websocket client
const userinfo = useSelector((state) => state.login.email);
const bidPrice = useRef(0); //입찰가격 input
const [bidResponse, setBidResponse] = useState({}); //ws으로 받은 입찰응답
const [chatHistory, setChatHistory] = useState([]); //전체채팅기록
const currentChat = useRef(""); //채팅메세지 input
const [chatResponse, setChatResponse] = useState({}); //ws으로 받은 채팅응답
const [auctionOnAndOff, setAuctionOnAndOff] = useState({});
const isLogin = useSelector((state) => state.login.isLogin);
const member = useSelector((state) => state.login.member);
const navigate = useNavigate();

    useEffect(() => {
    // console.log(location.state.broadcastId)
    broadcastId.current = location.state.broadcastId;
    api.get(`/live/list/${broadcastId.current}/info`)
        .then(response => {
        const list = response.data.entries
        // console.log(list)
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
    setChatHistory((prev) => [...prev, chatResponse])
    }, [chatResponse]);

    useEffect(() => {
    // console.log(auctionOnAndOff)
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
            // console.log('소켓 연결 성공')
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
        alert("방송 종료")
        navigate("/broadcastList");
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
    let badgeColor;
    if(auctionStatus === 0) {
        toString = "경매 전"
        badgeColor = "gray";
    } else if(auctionStatus === 1) {
        toString ="진행 중"
        badgeColor = "green";
    } else {
        toString = "종료"
        badgeColor = "red";
    }

    return (
        <Badge fontSize={'2xl'} colorScheme={badgeColor}>{toString}</Badge>
    )
    }

    const bid = (currentAuction) =>  {
    const price = bidPrice.current;
    if(price > currentAuction.startPrice && price > currentAuction.highestPrice) {
        client.current.publish({ destination: "/pub/auction/bid", body: JSON.stringify({auctionId : currentAuction.auctionId, bid_price : price, bidMemberEmail : userinfo, broadcastId : broadcastId.current}) });
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

    const sendChat = (e) => {
    client.current.publish({ destination: "/pub/live/chat", body: JSON.stringify({broadcastId : broadcastId.current, sender : userinfo, message : currentChat.current})});
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
    client.current.publish({ destination: "/pub//broadcast/off/"+ broadcastId.current});
    }


    return(
        <Grid 
            templateAreas={`"bc bc chat"
                            "list detail bid"`}
            gridTemplateRows={'75vh 25vh'} // 세로
            gridTemplateColumns={'400px auto 450px'} // 가로
            gap={'1'}
            h={'100vh'}
            
        >
            <GridItem area={'bc'} bg={'black'}>
                <MyVideo />
            </GridItem>
            <GridItem area={'chat'}>
                <Flex flexDirection={'column'} h={'100%'}>
                    <Box>
                    <Center>
                        <Heading mt={'5px'}>생방송 채팅</Heading>
                    </Center>
                    </Box>
                    <Divider color={'green'} border={'1px'}/>
                    <Flex flexGrow={1}>
                        <Box w={'full'}>{displayChat(chatHistory)}</Box>
                    </Flex>
                    <Box h={'auto'}>
                        <InputGroup>
                            <Input className="input" onChange={chatChange} placeholder="메세지 보내기">
                            </Input>
                            <Button onClick={() => sendChat()}>채팅</Button>
                        </InputGroup>
                    </Box>
                </Flex>
            </GridItem>
            <GridItem area={'list'}>
                <Box>
                    {auctionList.map((auction , i) => (
                        <Box key={i} border={'1px solid black'} onClick={() => setCurrentAuction(()=> auction)}>
                            <Text size={'lg'}>
                                {auction.itemName} {status(auction)}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </GridItem>
            <GridItem area={'detail'}>
                {/* 연수님이 만든 컴포넌트가 들어갈 예정 */}
                <Flex flexDirection={'column'} h={'100%'}>
                    <Box h={'25%'}>
                        <HStack>
                            <Heading size={'2xl'}>
                                제품명 들어갈거야
                                {currentAuction.itemName}
                            </Heading>
                            <Spacer />
                            <Box mr={'5px'}>
                                {status(currentAuction)}
                            </Box>
                        </HStack>
                    </Box>
                    <Box h={'75%'} mt={'20px'}>
                        <Flex>
                            <Center w={'30%'}>
                                <VStack>
                                    <Heading>시작가</Heading>
                                    <Text>{currentAuction.startPrice}</Text>
                                </VStack>
                            </Center>
                            <Spacer />
                            <Center w={'30%'}>
                                <VStack>
                                    <Heading>현재최고입찰가</Heading>
                                    <Text>{currentAuction.highestPrice}</Text>
                                </VStack>
                            </Center>
                            <Spacer />
                            <Center w={'30%'}>
                                <VStack>
                                    <Heading>현재최고입찰자</Heading>
                                    <Text>{currentAuction.currentMemberEmail}</Text>
                                </VStack>
                            </Center>
                        </Flex>
                    </Box>
                </Flex>
            </GridItem>
            <GridItem area={'bid'}>
                <Flex flexDirection={'column'} h={'100%'}>
                    <Button w={'full'} h={'45%'} mt={'5px'}>
                        <Text fontSize={'3xl'}>입찰하기 {currentAuction.highestPrice} 원</Text>
                    </Button>
                    <Spacer />
                    <InputGroup w={'full'} h={'45%'} mb={'5px'} cursor={'pointer'}>
                        <Input h={'100%'} textAlign={'center'} fontSize={'4xl'} variant='flushed' type="number" onChange={bidChange}/>
                        <InputRightAddon
                            h={'100%'}
                            fontSize={'3xl'}
                            disabled={currentAuction.status === 1 ? false : true} onClick={() => bid(currentAuction)}
                            children={
                                <Text as={'b'}>원 자율 입찰</Text>
                            }>
                        </InputRightAddon>
                    </InputGroup>
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default Broadcast;
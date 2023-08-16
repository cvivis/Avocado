import React from "react";
import {
    Badge,
    Box, Button, Center, Divider, Flex, Grid, GridItem, 
    HStack, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton,
    Heading, Input, InputGroup, InputRightAddon, useDisclosure, Spacer, Text, VStack,
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

function BroadcastTest() {

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

    // const [myColor, setMyColor] = useState(''); //경매리스트

    useEffect(() => {
    connect(); // 마운트시 실행
    // function getRandomColor(){
    //     return '#'+Math.floor(Math.random()*16777215).toString(16);
    // }
    // setMyColor(getRandomColor);
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
        brokerURL: 'wss://i9a407.p.ssafy.io:8080/ws/live-auction',
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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    function MyAlert() {

        return (
            <>
                <Button onClick={onOpen}>Discard</Button>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to discard all of your notes? 44 words will be
                            deleted.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme='red' ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        )
    }

    const bid = (currentAuction) =>  {
        const price = bidPrice.current;
        if(price > currentAuction.startPrice && price > currentAuction.highestPrice) {
            client.current.publish({ destination: "/pub/auction/bid", body: JSON.stringify({auctionId : currentAuction.auctionId, bid_price : price, bidMemberEmail : userinfo, broadcastId : broadcastId.current}) });
        }
        else {
            MyAlert();
            onOpen();  
        }
    }

    const bidChange = (e) => {
    bidPrice.current = e.target.value;
    };

    const chatChange = (e) => {
    currentChat.current = e.target.value;
    }

    const chatInput = useRef();

    const sendChat = (e) => {
        if(currentChat.current !== "") {
            client.current.publish({ destination: "/pub/live/chat", body: JSON.stringify({broadcastId : broadcastId.current, sender : userinfo, message : currentChat.current})});
            currentChat.current = ""
            chatInput.current.value = ""
        }
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
          sendChat(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };
      // 인풋에 적용할 Enter 키 입력 함수

    const chatFocus = useRef();

    useEffect(() => {
        chatFocus.current.scrollIntoView({behavior:'smooth'});
    },[chatHistory])

    const displayChat = (chats) => {
        let result = [];
        for(let i of chats) {
            if(i.sender) result.push(
            <Box>
                <HStack>
                    <Box w={'15%'}>
                        <Text fontSize={'lg'}>{i.sender}</Text>
                    </Box>
                    <Spacer />
                    <Box w='83%'>
                        <Text fontSize={'lg'}>{i.message}</Text>
                    </Box>
                </HStack>
            </Box>
            )
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

    // 우측 하단 컴포넌트
    function ControlBox() {

        // 현재 로그인 된 계정이 관리지인지 일반사용자인지 받아와야 함
        const role = useSelector((state)=>state.login.role);
        console.log(role);

        if (role === 'ROLE_ADMIN') {
            return (
                <GridItem area={'bid'}>
                    <Center mt={'20px'}>
                        <Heading>관리자 패널</Heading>
                    </Center>
                    <HStack mt={'20px'}>
                        <Button onClick={() => start(currentAuction)} w={'33%'} h={'100px'} fontSize={'3xl'} bg={'green.300'}>경매시작</Button>
                        <Spacer />
                        <Button onClick={() => stop(currentAuction)} w={'33%'} h={'100px'} fontSize={'3xl'} bg={'orange.300'}>경매종료</Button>
                        <Spacer />
                        <Button onClick={() => broadcastOff()} w={'33%'} h={'100px'} fontSize={'3xl'} bg={'red.300'}>방송종료</Button>
                    </HStack>
                </GridItem>
            );
        } else {
            return (
                <GridItem area={'bid'}>
                    <Flex flexDirection={'column'} h={'100%'}>
                        <Button w={'full'} h={'45%'} mt={'5px'}>
                            <Text fontSize={'3xl'}>입찰하기 {currentAuction.highestPrice+1000} 원</Text>
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
                    <Box hidden>
                        <Button onClick={onOpen}>Discard</Button>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent>
                                <AlertDialogHeader>입찰가가 올바르지 않습니다</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody>
                                    올바른 입찰가를 입력하세요 :)
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose} colorScheme='green'>
                                        확인
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Box>
                </GridItem>
            );
        }
        
    }

    function CurrentItem(props) {
        if (currentAuction === props.item) {
            return (
                <>
                    &gt;&gt;&nbsp;
                </>
            )
        }
    }


    return(
        <Grid 
            templateAreas={`"bc bc chat"
                            "list detail bid"`}
            gridTemplateRows={'74vh 24vh'} // 세로
            gridTemplateColumns={'400px auto 450px'} // 가로
            gap={'1'}
            h={'99vh'}
            w={'199vh'}
        >
            <GridItem >
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
                    <Flex flexDirection={'column'} flexGrow={1} overflow={'auto'} sx={{ msOverflowStyle:'none', '::-webkit-scrollbar':{display:'none'}}}>
                        <Box w={'full'} h={'full'}>
                            {displayChat(chatHistory)}
                        </Box>
                        <Box ref={chatFocus}></Box>
                    </Flex>
                    <Box h={'auto'}>
                        <InputGroup>
                            <Input onChange={chatChange} onKeyUp={handleOnKeyPress} placeholder="메세지 보내기" ref={chatInput}>
                            </Input>
                            <Button onClick={(event) => sendChat(event)}>채팅</Button>
                        </InputGroup>
                    </Box>
                </Flex>
            </GridItem>
            <GridItem area={'list'} overflow={'auto'} sx={{ msOverflowStyle:'none', '::-webkit-scrollbar':{display:'none'}}}>
                <Flex direction={'column'}>
                {/* border={'1px solid black'} */}
                    {auctionList.map((auction , i) => (
                        <HStack key={i} onClick={() => setCurrentAuction(()=> auction)} mb={'2px'}> 
                            <Text fontSize={'lg'} as={'b'}>
                                <CurrentItem item={auction} />{auction.itemName} 
                            </Text>
                            <Spacer />
                            <Box w={'30%'}>
                                {status(auction)}
                            </Box>
                        </HStack>
                    ))}
                </Flex>
            </GridItem>
            <GridItem area={'detail'}>
                <Flex flexDirection={'column'} h={'100%'}>
                    <Box h={'25%'}>
                        <HStack>
                            <Heading size={'2xl'}>
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
                                    <Heading mb={'20px'}>시작가</Heading>
                                    <Text fontSize={'4xl'} as={'b'}>{currentAuction.startPrice}원</Text>
                                </VStack>
                            </Center>
                            <Spacer />
                            <Center w={'30%'}>
                                <VStack>
                                    <Heading mb={'20px'}>현재최고입찰가</Heading>
                                    <Text fontSize={'4xl'} as={'b'}>{currentAuction.highestPrice}원</Text>
                                </VStack>
                            </Center>
                            <Spacer />
                            <Center w={'30%'}>
                                <VStack>
                                    <Heading mb={'20px'}>현재최고입찰자</Heading>
                                    <Text fontSize={'4xl'} as={'b'}>{currentAuction.currentMemberEmail}님</Text>
                                </VStack>
                            </Center>
                        </Flex>
                    </Box>
                </Flex>
            </GridItem>
            <ControlBox />
        </Grid>
    )
}

export default BroadcastTest;
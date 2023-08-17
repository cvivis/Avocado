
import React, { useCallback } from "react";
import {
    Box, Divider, HStack, Heading, Flex, Spacer, Button, Text,
} from '@chakra-ui/react';
import { TimeIcon } from "@chakra-ui/icons";
import { right } from "@popperjs/core";
import { useState, useRef, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import * as BeforeNormalBid from "../component/normal/auction/beforeNormalBid";
import TimeCheck from "../component/normal/auction/timeCheck";
import { useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";

function MyBidInfo(props) {

    const email = useSelector((state) => state.login.email);
    const isBidEnd = useSelector((state) => state.myNormalBids.isBidEnd[props.id]);
    const isBidBeforeStart = useSelector((state) => state.myNormalBids.isBidBeforeStart[props.id]);

    const [bidInfo, setBidInfo] = useState({
        nowPrice: props.boardDetail.hopePrice,
        myPrice: 0
    })

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0);


    const id = props.id;

    // const mPrice = props.boardDetail.hopePrice + BeforeNormalBid.setBidPlus(props.boardDetail.price);
    // const endAtDate = props.boardDetail.endAt;    
    // const endAt = new (endAtDate);
    // const currentDateTime = new Date();





    //입찰버튼
    function handleBid() {
        if (!isButtonDisabled) {
            setButtonDisabled(true);
            setProgressWidth(100); // 프로그레스 바 시작

            setTimeout(() => {
                setButtonDisabled(false);
                setProgressWidth(0); // 프로그레스 바 리셋
            }, 1000);
        }
        publish();
    }

    /*stomp 관련 */
    const client = useRef({});
    const connect = useCallback(() => {
        client.current = new StompJs.Client({   
            brokerURL: 'wss://i9a407.p.ssafy.io:8080/ws/normal-auction',
            onConnect: () => {
                console.log("연겨여여여여얼")
                // Do something, all subscribes must be done is this callback
                console.log("연결 SUB22");
                subscribe();
            },
        });
        client.current.activate();
    }, []);

    useEffect(() => {
        const nowP = props.boardDetail.hopePrice;
        const mPrice = props.boardDetail.successPrice !=null ? (props.boardDetail.successPrice):(props.boardDetail.hopePrice);

        setBidInfo({
            nowPrice: nowP,
            myPrice: mPrice
        });
        ;
        connect(); // 마운트시 실행
        return () => disconnect(); // 언마운트 시 실행
    }, [connect, props.boardDetail.auctionId, props.boardDetail.hopePrice]);
const disconnect = () => {
    client.current.deactivate(); // 활성화된 연결 끊기
  };



    const subscribe = () => {
        // console.log("야 들어왔냐2")
        // console.log(id + "옥션아이디2")
        // console.log(bidInfo.nowPrice);
        client.current.subscribe('/sub/normal/' + id, (res) => { // server에게 메세지 받으면
            // console.log("들어왔당.")
            const jsonBody = JSON.parse(res.body);
            console.log(jsonBody);
            setBidInfo((prevState) => {
                console.log("호가: " + BeforeNormalBid.setBidPlus(jsonBody.price));
                return { ...prevState, nowPrice: jsonBody.price, myPrice: jsonBody.price , nowBidName: jsonBody.email }
            });
        })
    };


    const publish = () => {
        // console.log("in Pub" + bidInfo.myPrice);
        console.log("옥션 아이디 " + id);
        // console.log(client.current + "클라이언트얍1");
        const newPrice = bidInfo.myPrice +BeforeNormalBid.setBidPlus(bidInfo.myPrice);

        client.current.publish({
            destination: '/pub/normal/' + id,
            body: JSON.stringify({ id: id, price: newPrice, email: email, itemId: props.boardDetail.itemId }),
            skipContentLengthHeader: true,
        });
    }
    // console.log(isBidBeforeStart + "비포스타토" + isBidEnd);
    // console.log(props.id, isBidEnd);

    // 마감시간 여부 state로 관리하고 timeCheck에서 받아오기

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressWidth((prevWidth) => Math.max(0, prevWidth - 1));
        }, 30); // 매 30ms마다 프로그레스 바를 조금씩 줄이도록 설정

        return () => clearInterval(interval);
    }, []);

    function BidButton() {

        if (!isBidEnd) {
            return (
                <Button size={'lg'} mt={'20px'} bg={'black'} color={'white'} w={'300px'}
                    isDisabled={!isBidEnd}
                    _hover={{
                        bg: 'black'
                    }}
                    _active={{
                        bg: 'black'
                    }}
                    _disabled={{
                        bg: 'black',
                        color: 'white',
                        cursor: 'not-allowed',
                        opacity: 1
                    }}>
                    <Text textAlign={'center'}>
                        마감
                    </Text>
                </Button>
            )
        } else {
            if (!isBidBeforeStart) {
                return (
                    <div>
                        <Button
                            onClick={handleBid}
                            
                            size={'lg'} mt={'20px'}
                            bg={'green'} color={'whiteAlpha.900'}
                            _hover={{ bg: 'green.300' }}
                            w={'300px'}
                            disabled={isButtonDisabled}
                            style={{
                                opacity: isButtonDisabled ? 0.5 : 1,
                                pointerEvents: isButtonDisabled ? 'none' : 'auto',
                            }}
                        >
                            <Text>
                                입찰하기
                            </Text>
                            <Text textAlign={'right'}>
                            {
                            BeforeNormalBid.setBidPlus(bidInfo.myPrice) + bidInfo.myPrice
                            } 원
                            </Text>
                        </Button>
                        <div
                            className="progress-bar"
                            style={{
                                width: progressWidth + '%',
                                height: '20px',
                                backgroundColor: 'green',
                                transition: 'width 0.1s ease-in-out', // 부드러운 애니메이션 효과
                            }}
                        />
                    </div>
                )
            } else {
                return (
                    <Button size={'lg'} mt={'20px'} bg={'black'} color={'white'} w={'300px'}
                        onClick={handleBid}
                        isDisabled={isBidBeforeStart}
                        _hover={{
                            bg: 'blue'
                        }}
                        _active={{
                            bg: 'black'
                        }}
                        _disabled={{
                            bg: 'orange.300',
                            color: 'white',
                            cursor: 'not-allowed',
                            opacity: 1
                        }}>

                        시작전
                    </Button>
                )
            }
        }
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
                    
                    {bidInfo.myPrice}원
                    
                    
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
                    <TimeCheck id={props.id} endAt={props.boardDetail.endAt} startAt={props.boardDetail.startAt}></TimeCheck>
                </Heading>
            </HStack>
            <HStack>
                <Spacer />
                <BidButton />
            </HStack>

        </Box>
    )
}

export default MyBidInfo;

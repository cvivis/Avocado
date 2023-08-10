import React from "react";
import {
    Box, Divider, HStack, Heading, Flex, Spacer, Button, Text,
} from '@chakra-ui/react';
import { TimeIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import * as BeforeNormalBid from '../component/normal/auction/beforeNormalBid';
import { useSelector } from "react-redux";

function MyBidInfo(props) {
    const email = useSelector((state)=>state.login.email);
    const nowP = props.boardDetail.price;
    const mPrice =  props.boardDetail.price + BeforeNormalBid.setBidPlus(props.boardDetail.price);
    const [bidInfo, setBidInfo] = useState({
        nowPrice : "",
        myPrice :  ""
    })
    const auctionId = props.boardDetail.auctionId;

    //입찰버튼
    function handleBid() {
        publish();
    }

    /*stomp 관련 */
    const client = useRef({});
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/ws/chat',
            onConnect: () => {
                // Do something, all subscribes must be done is this callback
                subscribe();
            },
        });
        client.current.activate();
    }

    useEffect(() => {
        setBidInfo( { nowPrice:nowP, myPrice:mPrice});
        connect(); // 마운트시 실행
        return () => disconnect(); // 언마운트 시 실행
    }, [nowP]);




    const disconnect = () => {
        client.current.deactivate(); // 활성화된 연결 끊기 
    };

    const subscribe = () => {
        client.current.subscribe('/sub/normal/' + auctionId, (res) => { // server에게 메세지 받으면
            const jsonBody = JSON.parse(res.body);
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

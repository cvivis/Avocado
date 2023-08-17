import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box, Center,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import TimeCheck from '../component/normal/auction/timeCheck';

function MyCard(props) {
    // const filterList = useSelector((state) => state.boardList.filterList);
    const { item } = props;
    // console.log(item.itemId+"아이디");
    // console.log(item.name+"이름");
    // console.log(item.content+"내용");
    const dateForm = "YYYY-MM-DD HH:mm:ss";
    const startTime = dayjs(props.startAt).format(dateForm);
    const startTimeTimeInDayjs = dayjs(startTime);

    const isBidBeforeStart = useSelector((state)=>state.myNormalBids.isBidBeforeStart[item.itemId]);
    const isBidEnd = useSelector((state)=>state.myNormalBids.isBidEnd[item.itemId]);

    // console.log(isBidEnd+"엔드")
    // console.log(isBidBeforeStart+"비포스타트")
    // useEffect(()=>{

    // })
    // function Progress(){
    //     if(isBidBeforeStart){
    //         return(
    //         <Text background={'orange.300'} color={'white'} align={'center'} fontSize={'35px'}>시작전</Text>
    //         )
    //     }
        
    //     else if(!isBidEnd){
    //         return(
    //         <Text background={'black'} color={'white'} align={'center'} fontSize={'35px'}>마감</Text>
    //         )
    //     }else{
    //         return(
    //         <Text background={'green'} color={'white'} align={'center'} fontSize={'35px'}>진행중</Text>
    //         )
    //     }
    // }
    function TimeBadge() {

        const dateForm = "YYYY-MM-DD HH:mm:ss";
        const endTime = dayjs(props.item.endAt).format(dateForm);
        const endTimeInDayjs = dayjs(endTime);
        const startTime = dayjs(props.item.startAt).format(dateForm);
        const startTimeInDayjs = dayjs(startTime);
        const now = dayjs(); // 현재 시간 
        let diff = endTimeInDayjs.diff(now); // 마감시간과 현재 시간 차이 구하기 
        let startDiff = startTimeInDayjs.diff(now);

        if(startDiff>0) {
            return(
                <Box  size={'lg'} mt={'20px'} bg={'orange.300'} color={'white'} w={'70px'} textAlign={'center'}
                >
                시작전
            </Box>
                )
        }else if(diff <=0){
            return(
                <Box  size={'lg'} mt={'20px'} bg={'blackAlpha.800'} color={'white'} w={'50px'} textAlign={'center'}
                >
                마감
            </Box>
            )
        }else{
            return(
                <Box  size={'lg'} mt={'20px'} bg={'green.500'} color={'white'} w={'70px'} textAlign={'center'}
                >
                진행중
            </Box>
            )
        }

    }

    return (
        <Box w={300}>
            <Link to={`/normal/detail/${item.itemId}`}>
                <Card align='center'>
                    <CardBody>
                        <Image
                            objectFit='cover'
                            src={item.url}
                            // src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Chakra UI'
                        />
                        <Heading size='md'>{item.name}</Heading>
                        
                        {/* <Progress></Progress> */}

                        <Heading size={'md'} textAlign={'left'}>
                        <TimeBadge/>
                        </Heading>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme="green" >
                            상세보기
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        </Box>
    )
}

export default MyCard;
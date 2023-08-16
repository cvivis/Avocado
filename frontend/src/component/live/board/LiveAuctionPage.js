import { React, useState, forwardRef } from "react";
import {
    Flex, Spacer, Box, Center, Card, Button, Text,
} from "@chakra-ui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../board/LiveAuction.css';
import { ko } from "date-fns/esm/locale";
import { getMonth, getDate } from "date-fns";
import BroadcastList from "../auction/BroadcastList";
import LiveAuctionList from "./LiveAuctionList";
import { useSelector,useDispatch } from "react-redux";
import dayjs from "dayjs";

function LiveAuctionPage() {
    const id = useSelector((state)=>state.broadcastId.broadcastId);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate);
    const now = new Date();
    const max = new Date(Date.parse(now)+30*1000*60*60*24); // 한달 리미트
    const dateForm = "YYYY-MM-DD HH:mm:ss";
    


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button
            className="example-custom-input" onClick={onClick} ref={ref}
            bg={'green'} _hover={{ bg: "green" }} color={'white'}
            fontSize={'3xl'} w={'400px'}
        >
        {value}
        </Button>
    ));

    function ListBox() {

        if(id === 0) {
            return (
                <>
                    <Text as={'b'} fontSize={'3xl'}>방송을 선택해 주세요</Text>
                </>
            )
        }
        else{
            return (
                <>
                    <Text as={'b'} fontSize={'3xl'}>방송 경매 물품 목록</Text>
                </>
            )
        }
    }

    return (
        <>
            <Flex mt={'20px'}>
                <Spacer />
                <Card w={'40%'} h={'80vh'}>
                    <Center>
                        <DatePicker
                            calendarClassName="date-picker-calendar"
                            className="date-picker"
                            locale={ko}
                            dateFormat='yyyy년 MM월 dd일 (eee)' // 날짜 형태
                            dateFormatCalendar="yyyy년 MM월"
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            minDate={new Date()} // minDate 이전 날짜 선택 불가
                            maxDate={max} // maxDate 이후 날짜 선택 불가
                            selected={startDate}
                            onChange={(date) => {setStartDate(date);  }}

                            customInput={<ExampleCustomInput />}
                            showPopperArrow={false}
                        />
                    </Center>
                    <Center>
                        <BroadcastList value={dayjs(startDate).format(dateForm)} ></BroadcastList>
                    </Center>
                </Card>
                <Spacer />
                <Card w={'40%'} h={'80vh'}>
                    <Center> 
                        <ListBox />
                    </Center>
                    <Center>
                        <LiveAuctionList></LiveAuctionList>
                    </Center>
                </Card>
                <Spacer />
            </Flex>
        </>
    )
}

export default LiveAuctionPage;
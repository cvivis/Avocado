import { React, useState, forwardRef } from "react";
import {
    Flex, Spacer, Box, Center, Card, Button,
} from "@chakra-ui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";


function LiveAuctionPage() {
    
    const [startDate, setStartDate] = useState(new Date());
    const now = new Date();
    const max = new Date(Date.parse(now)+30*1000*60*60*24); // 한달 리미트
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button className="custom-input" onClick={onClick} ref={ref}    
            bg={'green'}
            color={'white'}
            w={'400px'}
            fontSize={'3xl'}
            _hover={{ bg: "green" }}
            mt={'10px'}
        >
            {value}
        </Button>
    ));

    return (
        <>
            <Flex mt={'20px'}>
                <Spacer />
                <Card w={'40%'} h={'65vh'}>
                    <Center>
                        <DatePicker
                            calendarClassName="date-picker-calendar"
                            renderCustomHeader={({
                                date,
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                              }) => (
                                <Flex bg={'green'}>
                                    <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} bg={'green'} _hover={{ bg: "green" }} color={'white'}>
                                        {"<"}
                                    </Button>
                                    <Button onClick={increaseMonth} disabled={nextMonthButtonDisabled} bg={'green'} _hover={{ bg: "green" }} color={'white'}>
                                        {">"}
                                    </Button>
                                </Flex>
                            )}
                            locale={ko}
                            dateFormat='yyyy년 MM월 dd일' // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            minDate={new Date()} // minDate 이전 날짜 선택 불가
                            maxDate={max} // maxDate 이후 날짜 선택 불가
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            customInput={<CustomInput />}
                        />
                    </Center>
                </Card>
                <Spacer />
                <Card w={'40%'} h={'65vh'}>
                    <Center> 
                        오른쪽 박스
                    </Center>
                </Card>
                <Spacer />
            </Flex>
        </>
    )
}

export default LiveAuctionPage;
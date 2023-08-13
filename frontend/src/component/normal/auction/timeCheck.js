// import NormalBid from "./normalBid";
// import "../App.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { setIsBidBeforeStart, setIsBidEnd } from "../../../redux/myNormalBidsSlice";



function TimeCheck(props) {
  const [day, setDay] = useState(0); // 남은 시간 (단위: 날)
  const [hour, setHour] = useState(0); // 남은 시간 (단위: 시)
  const [minute, setMinute] = useState(0); // 남은 시간 (단위: 분)
  const [second, setSecond] = useState(0); // 남은 시간 (단위: 초)
  // const [date, setDate] = useState(); // 남은 시간 (단위: 경매 마감 날짜)
  // const [time, setTime] = useState(); // 남은 시간 (단위: )
  const dateForm = "YYYY-MM-DD HH:mm:ss";
  const endTime = dayjs(props.endAt).format(dateForm);
  const endTimeInDayjs = dayjs(endTime);
  const startTime = dayjs(props.startAt).format(dateForm);
  const startTimeInDayjs = dayjs(startTime);
  // console.log(props.startAt);
  // console.log(endTime);
  // console.log(props.id + "아이디")
  const isBidEnd = useSelector((state) => state.myNormalBids.isBidEnd);
  const isBidBeforeStart = useSelector((state) => state.myNormalBids.isBidBeforeStart);

  const [isBlinking, setIsBlinking] = useState(false);
  const dispatch = useDispatch();
  // console.log(props.itemId + "호이짜");


  // console.log(props.endAt + "야야야야야야야야야야야야ㅑ양");
  // useEffect(() => {

  //   // console.log(dayjs(date).format() + "");
  // }, []);

  useEffect(() => {
    // const json = endTime; // 마감데이터 받아오기 
    // console.log("지금 유즈 이펙트 실행되었어요")
    // const dateJson = dayjs(json).format(dateForm);
    // setDate(dateJson);
    // setTime(dateJson);
    // const temp = dayjs(date);
    const timer = setInterval(() => {
      // setTime(temp.subtract(1, "s").format()); // 마감 시간 -1초 
      const now = dayjs(); // 현재 시간 
      let diff = endTimeInDayjs.diff(now); // 마감시간과 현재 시간 차이 구하기 
      let startDiff = startTimeInDayjs.diff(now);
      if (diff <= 60 * 1000) { // 1분 미만일 때
        setIsBlinking(!isBlinking); // 깜빡거리게 설정
      }
      console.log(startDiff + "시작시간")
      if (startDiff > 0) {
        dispatch(setIsBidBeforeStart({ id: props.id, value: true }));
      } else {
        dispatch(setIsBidBeforeStart({ id: props.id, value: false }));
      }


      if (diff <= 0) {
        console.log("마감", props.id); // 낙찰
        setDay("--");
        setHour("--");
        setMinute("--");
        setSecond("--");
        clearInterval(timer);
        dispatch(setIsBidEnd({ id: props.id, value: false }));
      } else {
        dispatch(setIsBidEnd({ id: props.id, value: true }));
        // console.log("diff : " + diff);
        const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
        setDay(diffDay);
        // console.log("day: " + Math.floor(day));
        diff = diff - diffDay * (1000 * 60 * 60 * 24);
        const diffHour = Math.floor(diff / (1000 * 60 * 60));
        setHour(diffHour);
        // console.log("hour : " + Math.floor(hour));
        diff = diff - diffHour * (1000 * 60 * 60);

        const diffMinute = Math.floor(diff / (1000 * 60));
        setMinute(diffMinute);
        // console.log("minute : " + Math.floor(minute));
        diff = diff - diffMinute * (1000 * 60);

        const diffSecond = Math.floor(diff / 1000);
        setSecond(diffSecond);
        // console.log("second : " + Math.floor(second));
      }
    }, 1000);

    // console.log(time);

    return () => clearInterval(timer);
  }, [props.endAt]);

  return (
    <div>

      {/* {date} */}
      {isBidEnd[props.id] === undefined ? null : (
        isBidEnd[props.id] && !isBidBeforeStart[props.id] ? (
          <Box as="span" color={isBlinking ? 'red' : 'inherit'}>
            {day}일 {hour}시간 {minute}분 {second}초
          </Box>
        ) : null
      )}

      {/* <span>{getSeconds(time)}</span> */}
    </div>
  );
}

export default TimeCheck;
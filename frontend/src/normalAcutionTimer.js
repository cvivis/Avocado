import './App.css';
import { useState , useRef, useEffect} from 'react';
import dayjs from "dayjs";
function NormalAcutionTimer() {
    // let endAt = "";
    const [endAt , setEndAt] = useState(""); 
    const [day, setDay] = useState("")
    const [diff, setDiff] = useState("");
    const [hour, setHour] = useState("");
    // 시간을 가져와 23에서 시간값을 뺀 시간을 정해주는 state
      const [minute, setMinute] = useState("");
    // 분을 가져와 59에서 분값을 뺀 분을 정해주는 state
      const [second, setSecond] = useState("");
    // 초를 가져와 59에서 초값을 뺀 초를 정해주는 state

    console.log(new Date(endAt).getDate() + " " +  new Date().getDate())
    // console.log(endAt.split(" ")[1].split(":")[0])
    console.log("날짜 : "+new Date("2023-7-30 12:32:31").getTime())
    console.log("날짜 : "+new Date().getTime())

    useEffect(() => {
        // setEndAt( "'2023-07-27 12:32:31'");   
        setDiff(new Date(endAt).getTime() - new Date().getTime());
        setDay(Math.ceil(diff / (1000 * 60 * 60 * 24)));
        setHour(diff - day ));
        setMinute(59 - new Date().getMinutes());
        setSecond(59 - new Date().getSeconds());
        // const id = setInterval(() => {
            // setDay()
            
      },[endAt]);
      useEffect(() => {
        // setEndAt( "'2023-07-27 12:32:31'");   
        setEndAt("2023-7-30 12:32:31");

    //   }, 1000);
      // 1초마다 실행되는 인터벌을 이용해 1초마다 다시 랜더링 시켜줌
    //   return () => clearInterval(id);
      // 페이지를 벗어나게되면 반복을 종료해줌 
      },[]);

      return (
        <div className="App">
          <h1>남은 시간</h1>
          <h3>마감 시간 : {endAt}</h3>
          <h3>차이 : {diff}</h3>
          <h3>{day}일 {hour}시간 {minute}분 {second}초</h3>
        </div>
      );
  }
  
  export default NormalAcutionTimer;
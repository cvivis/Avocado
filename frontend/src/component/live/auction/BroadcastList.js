import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';
import { useNavigate } from "react-router-dom";
import { setBroadcastId } from "../../../redux/broadcastIdSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import MyVideo from "../../../common/MyVideo";
import BroadcastTest from "./BroadcastTest";
import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";


function BroadcastList(date) {
  const [broadcastList,setBroadcastList] = useState([]);
  const id = useSelector((state)=> state.broadcastId.broadcastId);
  const navigate = useNavigate();
  const participate = (broadcast) => { // 방송 경로
    // <BroadcastTest useId={broadcast.broadcastId}></BroadcastTest>
    navigate("/broadcastTest" ,{state : {"broadcastId" : broadcast.broadcastId}});
  };
  const dispatch = useDispatch();
  const dateForm = "YYYY-MM-DD";
  const liveForm= "YYYY-MM-DD HH:mm";
  const datejs = dayjs(date.value).format(dateForm);
  console.log(datejs);
  // const loadBroadcasts = (e) => {
  // }
  useEffect(() => {
    api.get(`manage/items/broadcast/` +datejs).then(response => {
      console.log(response)

      if(response.data) setBroadcastList(response.data)
      else{
        setBroadcastList([]);
        dispatch(setBroadcastId(0));
      
    }
    });
    // api.get("/live/list")
    //   .then(response => {
    //     if(response.data.entries) setBroadcastList(response.data.entries)
    //   })
    //   .catch(error => {
    //     console.error('API 요청 에러:', error);
    //   });
  }, [datejs]);
  return (
    <Box className="container">
      <Box className="row">
        <TableContainer>
          <Table>
            {/* <Thead>
              <Tr>
                <Th>번호</Th>
                <Th>방송명</Th>
                <Th>시작시간</Th>
                <Th>방송참여</Th>
                <Th>상세보기</Th>
              </Tr>
            </Thead> */}
            <Tbody>
              {broadcastList.map((broadcast , i) => ( 
                console.log(broadcast.startAt),
                  <Tr key={broadcast.id}>
                      {/* <Td>{i+1}</Td> */}
                      <Td><Text fontSize={'2xl'}>{broadcast.title}</Text></Td>
                      <Td><Text fontSize={'2xl'}>{dayjs(broadcast.startAt).format(liveForm)}</Text></Td>
                      <Td><Button fontSize={'2xl'} bg={'red'} isDisabled={broadcast.status === false ? true : false} onClick={() => participate(broadcast)}>방송참여</Button></Td>
                      <Td><Button fontSize={'2xl'} bg={'green.300'} onClick={() => {dispatch(setBroadcastId(broadcast.broadcastId)); console.log(broadcast)}}>상세 보기</Button></Td>
                  </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default BroadcastList;

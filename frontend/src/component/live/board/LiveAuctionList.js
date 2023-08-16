import React,{useEffect} from "react";
import api from "../../../api";
import { useDispatch,useSelector } from "react-redux";
import { setLiveAuctionList } from "../../../redux/liveAuctionListSlice";
import { useParams } from "react-router-dom";
import { el } from "date-fns/locale";
import { Box, Divider, HStack, Spacer, VStack, Text } from "@chakra-ui/react";


function LiveAuctionList(){
    const id=useSelector((state)=>state.broadcastId.broadcastId);
    const dispatch=useDispatch();
    const liveAuctionList = useSelector((state) => state.liveAuctionList.liveAuctionList);
    
    useEffect(()=>{
        api.get(`/live/list/${id}`)
        .then(response=>{
            if(response)dispatch(setLiveAuctionList(response.data.entries));
            

        })
        .catch(error=>{
            console.error('API 요청 에러: ',error);

        });
    },[id]);
    return(
        <VStack w={'600px'} mt={'15px'}>
            {liveAuctionList&&liveAuctionList.map((liveauction)=>(
                <>
                <HStack w={'100%'} key = {liveauction.auctionId}>
                    <Box w={'20%'} textAlign={'center'}><Text fontSize={'2xl'}>{liveauction.auctionId}번</Text></Box>
                    <Spacer></Spacer>
                    <Box w={'40%'} textAlign={'center'}><Text fontSize={'2xl'}>{liveauction.name}</Text></Box>
                    <Spacer></Spacer>
                    <Box w={'40%'} textAlign={'right'}><Text fontSize={'2xl'}>{liveauction.category}</Text></Box>
                </HStack>
                <Divider></Divider>
                </>
            ))}
        </VStack>
    )

}

export default LiveAuctionList;
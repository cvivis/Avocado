import React,{useEffect} from "react";
import api from "../../../api";
import { useDispatch,useSelector } from "react-redux";
import { setBroadcastingLiveAuctions } from "../../../redux/broadcastingLiveAuctionsSlice";
import { useParams } from "react-router-dom";

function BroadcastingLiveAuctions(){
    const {id}=useParams();
    const dispatch=useDispatch();
    const broadcastingLiveAuctions = useSelector((state)=>state.broadcastingLiveAuctions.broadcastingLiveAuctions);

    useEffect(()=>{
        api.get(`/live/list/${id}/info`)
        .then(response=>{
            dispatch(setBroadcastingLiveAuctions(response.data.entries));
        }).catch(error=>{
            console.error('API 요청 에러: ', error);
        });
    },[id]);

    return(
        <div>
            {broadcastingLiveAuctions.map((liveauction)=>(
                <div key = {liveauction.auctionId}>
                    <div>{liveauction.auctionId}</div>
                    <div>{liveauction.highestPrice}</div>
                </div>
            ))}
        </div>
    );
}

export default BroadcastingLiveAuctions;


//null 처리 필요
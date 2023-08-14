import React,{useEffect} from "react";
import api from "../../../api";
import { useDispatch,useSelector } from "react-redux";
import { setLiveAuctionList } from "../../../redux/liveAuctionListSlice";
import { useParams } from "react-router-dom";


function LiveAuctionList(){
    const id=useSelector((state)=>state.broadcastId.broadcastId);
    const dispatch=useDispatch();
    const liveAuctionList = useSelector((state) => state.liveAuctionList.liveAuctionList);
    
    useEffect(()=>{
        api.get(`/live/list/${id}`)
        .then(response=>{
            dispatch(setLiveAuctionList(response.data.entries));

        })
        .catch(error=>{
            console.error('API 요청 에러: ',error);

        });
    },[id]);
    return(
        <div>
        {liveAuctionList&&liveAuctionList.map((liveauction)=>(
            <div key = {liveauction.auctionId}>
                <div>{liveauction.auctionId}</div>
                <div>{liveauction.name}</div>
                <div>{liveauction.category}</div>
                <br/>
            </div>
        ))}
    </div>
    )

}

export default LiveAuctionList;
import React, {useEffect } from "react";
import api from "../../../api";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setBroadcastList } from "../../../redux/broadcastListSlice";

function BroadcastList(){
    const dispatch = useDispatch();
    const broadcastList=useSelector((state)=>state.broadcastList.broadcastList);

    useEffect(()=>{
        api.get("/live/list")
        .then(response=>{
            dispatch(setBroadcastList(response.data.entries));
        })
        .catch(error=>{
            console.error('API 요청 에러: ',error);
        });
    },[dispatch]);

    return (
        <div>
            {broadcastList.map((broadcast)=>(
                <div key = {broadcast.id}>
                    <Link to ={`/live/list/${broadcast.id}`}>경매리스트 보기</Link>
                    <Link to ={`/live/list/${broadcast.id}/info`}>방송 바로가기</Link>
                    <div>{broadcast.title}</div>
                </div>
            ))}
        </div>
    )
}


export default BroadcastList;
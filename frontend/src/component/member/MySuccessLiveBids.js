import React, {useEffect} from "react";
import api from "../../api";
import {useDispatch, useSelector} from "react-redux";
import { setMySuccessLiveBids } from "../../redux/mySuccessLiveBidsSlice";
import { Grid } from "@chakra-ui/react";
import MyCard from "../../common/MyCard";

function MySuccessLiveBids(){
    const dispatch = useDispatch();
    const mySuccessLiveBids = useSelector((state)=> state.mySuccessLiveBids.mySuccessLiveBids);
    const accessToken = useSelector((state)=>state.login.accessToken);

    useEffect(()=>{
        api.get('/items/my-success-livebid', {headers: {Authorization:accessToken}})
        .then(response=>{
            dispatch(setMySuccessLiveBids(response.data.entries));
        })
        .catch(error=>{
            console.error('API 요청 에러: ', error );
        });
    },[]);

    return (
        <div>
        <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
        {mySuccessLiveBids&&mySuccessLiveBids.map((mybid) => (
            <div key={mybid.itemId}>
                <MyCard props= {mybid}></MyCard>
            </div>
        ))}
        </Grid>

    </div>
    )
}

export default MySuccessLiveBids;
import React,{useEffect} from "react";
import api from "../../api";
import {useDispatch, useSelector} from "react-redux";
import { setMyLiveBids } from "../../redux/myLiveBidsSlice";
import {
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, Box,
} from '@chakra-ui/react';
import MyCard from "../../common/MyCard";

function MyLiveBids(){
    const dispatch = useDispatch();
    const myLiveBids = useSelector((state)=> state.myLiveBids.myLiveBids);
    const accessToken = useSelector((state)=> state.login.accessToken);

    useEffect(()=>{
        api.get('/items/my-livebid', {headers: {Authorization:accessToken}})
        .then(response=>{
            dispatch(setMyLiveBids(response.data.entries));
        })
        .catch(error=>{
            console.error('API 요청 에러: ',error);
        });
    },[]);
    // console.log(myLiveBids);
    return (
        <div>
        <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
        {myLiveBids&&myLiveBids.map((mybids) => (
            <div key={mybids.itemId}>
                <MyCard props= {mybids}></MyCard>
            </div>
        ))}
        </Grid>

    </div>
    )
}
export default MyLiveBids;
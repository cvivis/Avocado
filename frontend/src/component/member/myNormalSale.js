import React,{useEffect} from "react";
import api from "../../api";
import { useDispatch,useSelector } from "react-redux";
import { setMyNormalSale } from "../../redux/myNormalSaleSlice";
import {
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, Box,
} from '@chakra-ui/react';
import MyCard from "../../common/MyCard";

function MyNormalSale(){
    const dispatch = useDispatch();
    const myNormalSale = useSelector((state)=>state.myNormalSale.myNormalSale);
    const accessToken = useSelector((state)=>state.login.accessToken);
    useEffect(()=>{
        api.get('items/my-sale',{headers:{Authorization: accessToken}})
        .then(response=>{
            dispatch(setMyNormalSale(response.data.entries));
        })
        .catch(error=>{
            console.error('API 요청 에러: ',error);
        });
    },[]);

    return(
        <div>
            <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
            {myNormalSale&&myNormalSale.map((mysale) => (
                <div key={mysale.itemId}>
                    <MyCard props= {mysale}></MyCard>
                </div>
            ))}
            </Grid>

        </div>
    )
}

export default MyNormalSale;
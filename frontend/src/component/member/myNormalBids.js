import React, { useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyNormalBids } from "../../redux/myNormalBidsSlice";
import {
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, Box,
} from '@chakra-ui/react';
import MyCard from "../../common/MyCard";

function MyNormalBids() {
    const dispatch = useDispatch();
    const myNormalBids = useSelector((state) => state.myNormalBids.myNormalBids);
    const accessToken = useSelector((state) => state.login.accessToken);

    useEffect(() => {
        api.get('/items/my-bid', { headers: { Authorization: accessToken} })
            .then(response => {
                dispatch(setMyNormalBids(response.data.entries));
            })
            .catch(error => {
                console.error('API 요청 에러: ', error);

            });
    }, []);
    console.log(myNormalBids);
    return (
        <div>
            <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
            {myNormalBids&&myNormalBids.map((mybid) => (
                <div key={mybid.itemId}>
                    <MyCard props= {mybid}></MyCard>
                </div>
            ))}
            </Grid>


        </div>
    )
}
export default MyNormalBids;
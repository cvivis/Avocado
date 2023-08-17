import React, { useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMySuccessNormalBids } from "../../redux/mySuccessNormalbidsSlice";
import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box, Grid
} from '@chakra-ui/react';
import MyCard from "../../common/MyCard";

function MySuccessNormalBids() {
    const dispatch = useDispatch();
    const mySuccessNormalBids = useSelector((state) => state.mySuccessNormalBids.mySuccessNormalBids);
    const accessToken = useSelector((state) => state.login.accessToken);

    useEffect(() => {
        api.get('/items/my-success-bid', { headers: { Authorization: accessToken} })
            .then(response => {
                dispatch(setMySuccessNormalBids(response.data.entries));
            })
            .catch(error => {
                console.error('API 요청 에러: ', error);

            });
    }, []);
    // console.log(mySuccessNormalBids);
    return (
        <div>
            <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
                {mySuccessNormalBids&&mySuccessNormalBids.map((mybid) => (
                    <div key={mybid.itemId}>
                        <MyCard props={mybid}></MyCard>
                    </div>
                ))}
            </Grid>

        </div>

    )
}

export default MySuccessNormalBids;
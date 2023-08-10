import React, { useEffect } from "react";
import api from "../../api";
import {
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, Box,
} from '@chakra-ui/react';
import Footer from "../../common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setMyNormalBids } from "../../redux/myNormalBidsSlice";
import MyCard from "../../common/MyCard";
import { setMySuccessNormalBids } from "../../redux/mySuccessNormalbidsSlice";
import MyNormalBids from "./myNormalBids";
import MySuccessNormalBids from "./mySuccessNormalBids";
import MyNormalSale from "./myNormalSale";



//import api from '../../../api';

function MyPage() {


    return (
        <div>
            {/* <Header></Header> */}
            <Grid>
                <Box h={50}></Box>
                <Box display="flex" justifyContent="space-between">
                    <Center></Center>
                    <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList>
                            <Tab>내 입찰 물품</Tab>
                            <Tab>내 낙찰 물품</Tab>
                            <Tab>내 판매 물품</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Box w={1300}></Box>
                                {/* for문으로 카드 반복 돌릴 예정 */}
                                <div>
                                    <div>상시경매</div>
                                    <MyNormalBids></MyNormalBids>


                                </div>
                                <div>
                                    <div>라이브 경매</div>

                                </div>

                            </TabPanel>
                            <TabPanel>
                                <Box w={1300}></Box>
                                <div>
                                    <div>상시 경매</div>
                                    <MySuccessNormalBids></MySuccessNormalBids>

                                </div>
                            </TabPanel>
                            <TabPanel>
                                <Box w={1300}></Box>
                                <div>상시 경매</div>
                                <MyNormalSale></MyNormalSale>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Center></Center>
                </Box>
            </Grid>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default MyPage;
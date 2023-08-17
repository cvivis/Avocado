 
import React, { useEffect } from "react";
import api from "../../api";
import {
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, Box,
} from '@chakra-ui/react';
import MyNormalBids from "./myNormalBids";
import MySuccessNormalBids from "./mySuccessNormalBids";
import MyNormalSale from "./myNormalSale";
import MyLiveBids from "./myLiveBids";
import MySuccessLiveBids from "./MySuccessLiveBids";

function MyPage() {


    return (
        <Box>
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
                            <TabPanel w={1300}>
                                <MyNormalBids />
                            </TabPanel>
                            <TabPanel w={1300}>
                                
                                <Tabs variant='soft-rounded' colorScheme='green'>
                                    <TabList>
                                        <Tab>상시 경매</Tab>
                                        <Tab>라이브 경매</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            {/* <MySuccessNormalBids /> */}
                                        </TabPanel>
                                        <TabPanel>
                                            <MySuccessLiveBids />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </TabPanel>
                            <TabPanel w={1300}>
                                <MyNormalSale></MyNormalSale>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Center></Center>
                </Box>
            </Grid>
        </Box>
    );
}

export default MyPage;
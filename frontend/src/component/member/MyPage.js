import React from "react";
import Header from "../../common/Header";
import {
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, Box,
} from '@chakra-ui/react';
import Footer from "../../common/Footer";
// import MyCard from "../../common/MyCard";
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
                                <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
                                    {/* for문으로 카드 반복 돌릴 예정 */}
                                    {/* <MyCard></MyCard>
                                    <MyCard></MyCard>
                                    <MyCard></MyCard>
                                    <MyCard></MyCard>
                                    <MyCard></MyCard>
                                    <MyCard></MyCard> */}
                                </Grid>
                            </TabPanel>
                            <TabPanel>
                                <Box w={1300}></Box>
                                <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'></Grid>
                            </TabPanel>
                            <TabPanel>
                                <Box w={1300}></Box>
                                <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'></Grid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Center></Center>
                </Box>
            </Grid>
            <Footer></Footer>
        </div>
    );
}

export default MyPage;
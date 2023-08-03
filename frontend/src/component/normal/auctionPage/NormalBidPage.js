import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import { 
    Box, Center,
    Grid,FormControl, Input, FormHelperText, IconButton, HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import MyCard from "../../../common/MyCard";
import MySearchBar from "../../../common/MySearchBar";

function NormalBidPage() {

    return (
        <Box>
            <Header></Header>
            <MySearchBar></MySearchBar>
            <Box display="flex" justifyContent="space-between">
                <Center></Center>
                <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
                    {/* 카드 반복문 돌릴 예정 */}
                    <MyCard></MyCard>
                    <MyCard></MyCard>
                    <MyCard></MyCard>
                    <MyCard></MyCard>
                    <MyCard></MyCard>
                </Grid>
                <Center></Center>
            </Box>
            <Footer></Footer>
        </Box>
    )
}

export default NormalBidPage;
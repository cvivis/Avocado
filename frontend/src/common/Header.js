import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Flex, Spacer, HStack,
} from '@chakra-ui/react';
import ProfileBtn from "./ProfileBtn";
import { useDispatch } from "react-redux";
import { resetSearchKeyword } from "../redux/searchSlice";
import api from "../api";
import { setFilterList } from "../redux/boardListSlice";
import { setDoSelect, setSelectedCategory } from "../redux/categorySlice";

function Header() {

    const dispatch = useDispatch();

    const handleReloadBoardList = () => {
    dispatch(resetSearchKeyword()); // 검색어 초기화
    dispatch(setSelectedCategory('')); // 선택 카테고리 초기화
    dispatch(setDoSelect(false)); // 선택 여부 초기화
    api.get("/normal/list")
    .then(response => {
        dispatch(setFilterList(response.data.entries));
        // do something with response.data.entries if needed
    })
    .catch(error => {
        console.error('API 요청 에러:', error);
    });
};


    return (
        <div>
            <Flex as="nav" p="30px" alignItems="center">
                <Button bg={"white"}>
                    <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1n2KE9iWPb_CKLzQ3adFwE9aPfJrOXMXYn1lFo8&s" alt="Logo"></img></Link>
                </Button>
                <Spacer />
                <HStack spacing="20px">
                    <ButtonGroup spacing={20}>
                        <Button bg={"white"}>
                            <Link to="/normal/auctionPage/NormalBidPage">상시 경매</Link>
                        </Button>
                        <Button bg={"white"}>라이브 경매</Button>
                        <Button bg={"white"}>
                            <Link to="/member/Consign">물품 입찰 요청</Link>
                        </Button>
                        <Button bg={"white"} onClick={handleReloadBoardList}>
                            <Link to="/normal/list"> 상시 경매 리스트 </Link>
                        </Button>
                    </ButtonGroup> 
                </HStack>
                <Spacer />
                <ProfileBtn />
            </Flex>
        </div>
    );
}

export default Header;

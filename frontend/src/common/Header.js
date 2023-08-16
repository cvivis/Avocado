
import { useDispatch, useSelector } from "react-redux";

import React from "react";

import { Link } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Flex, Spacer, HStack,
} from '@chakra-ui/react';
import ProfileBtn from "./ProfileBtn";
import { resetSearchKeyword } from "../redux/searchSlice";
import api from "../api";
import { setFilterList } from "../redux/boardListSlice";
import { setDoSelect, setSelectedCategory } from "../redux/categorySlice";
import logout from "../component/member/Logout";

function Header() {

    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    // 로그아웃 핸들러
    const handleLogout = () => {
        logout(dispatch);
    }


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
                <Link to="/"><img src={`${process.env.PUBLIC_URL}/아보카도.png`} alt="Logo"></img></Link>
                <Spacer />
                <HStack spacing="20px">
                    <ButtonGroup spacing={20}>
                        <Button bg={"white"} fontSize={'3xl'}>
                            <Link to="/normal/list">상시 경매</Link>
                        </Button>
                        <Button bg={"white"} fontSize={'3xl'}>
                            <Link to ="/broadcastList">
                            라이브 경매</Link>
                        </Button>
                        <Button bg={"white"} fontSize={'3xl'}>
                            <Link to="/member/Consign">물품 입찰 요청</Link>
                        </Button>
                        {/* <Button bg={"white"} onClick={handleReloadBoardList}>
                            <Link to="/normal/list"> 상시 경매 리스트 </Link>
                        </Button> */}
                    </ButtonGroup>
                </HStack>
                <Spacer />
                <ProfileBtn />
            </Flex>
        </div>
    );
}

export default Header;

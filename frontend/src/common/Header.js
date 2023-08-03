import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Flex, Spacer, HStack,
} from '@chakra-ui/react';
import ProfileBtn from "./ProfileBtn";

function Header() {


    return (
        <div>
            <Flex as="nav" p="30px" alignItems="center">
                <Button bg={"white"}>
                            <Link to="/">로고 들어갈 곳</Link>
                </Button>
                <Spacer />
                <HStack spacing="20px">
                    <ButtonGroup spacing={20}>
                        <Button bg={"white"}>
                            <Link to="/normal/auctionPage/NormalBidPage">상시 경매</Link>
                        </Button>
                        <Button bg={"white"}>라이브 경매</Button>
                        <Button bg={"white"}>물품 입찰 요청</Button>
                    </ButtonGroup> 
                </HStack>
                <Spacer />
                <ProfileBtn />
            </Flex>
        </div>
    );
}

export default Header;
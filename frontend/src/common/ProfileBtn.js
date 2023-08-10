import React from "react";
import {
    Menu, MenuButton, MenuList, MenuItem,
    Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logout from "../component/member/Logout"
import { useSelector } from "react-redux";


function ProfileBtn() {

    const isLogin = useSelector((state) => state.login.isLogin)
    
    return (
        <Menu>
            <MenuButton as={Avatar} colorScheme='green'></MenuButton>
            <MenuList>
                {isLogin ? (
                    <>
                        <Link to="/member/MyPage">
                            <MenuItem>My Page</MenuItem>
                        </Link>
                        <Logout />
                    </>
                )
                    : (
                        <>
                            <Link to="/member/login">
                                <MenuItem>Log In</MenuItem>
                            </Link>
                            <Link to="/member/signup">
                                <MenuItem>Sign up</MenuItem>
                            </Link>
                        </>
                    )}
            </MenuList>
        </Menu>
    )
}

export default ProfileBtn;
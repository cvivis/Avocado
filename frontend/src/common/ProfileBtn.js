import React from "react";
import {
    Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider,
    Button, Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logout from "../component/member/Logout"
import { useSelector } from "react-redux";


function ProfileBtn() {

    const isLogin = useSelector((state) => state.login.isLogin)
    const role = useSelector((state) => state.login.role);
    return (
        <Menu>
            <MenuButton as={Avatar} colorScheme='green'></MenuButton>
            <MenuList>
                {isLogin ? (
                    <>
                        {role === "ROLE_ADMIN" ? (
                            <Link to="/adminPage">
                                <MenuItem>관리자</MenuItem>
                            </Link>
                        )
                            : (
                                <Link to="/member/MyPage">
                                    <MenuItem>My Page</MenuItem>
                                </Link>
                            )}

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

                {/* <MenuGroup title='Profile'> */}

                {/* <Link to="/member/logout">
                    <MenuItem>


                        Log Out
                    </MenuItem>
                    </Link> */}
                {/* </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Help'>
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
            </MenuGroup> */}
            </MenuList>
        </Menu>
    )
}

export default ProfileBtn;
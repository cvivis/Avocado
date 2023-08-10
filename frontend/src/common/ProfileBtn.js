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
    
    return (
        <Menu>
            <MenuButton as={Avatar} colorScheme='green'></MenuButton>
            <MenuList>
            {/* Fragment(<></>) => 2개 이상 사용하려면, 이렇게 사용해야함 */}
                {isLogin ? (
                    <>
                        <Link to="/member/MyPage">
                            <MenuItem>My Page</MenuItem>
                        </Link>
                        <Logout />
                    </>
                )
                    : (
                        <Link to="/member/login">
                            <MenuItem>Log In</MenuItem>
                        </Link>
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
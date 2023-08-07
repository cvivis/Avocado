import React from "react";
import {
    Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider,
    Button, Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logout from "../component/member/Logout"


function ProfileBtn() {

    return (
        <Menu>
            <MenuButton as={Avatar} colorScheme='green'></MenuButton>
            <MenuList>
                {/* <MenuGroup title='Profile'> */}
                <Link to="/member/MyPage">
                    <MenuItem>
                        My Page
                    </MenuItem>
                </Link>
                <Link to="/member/login">
                    <MenuItem>
                        Log In
                    </MenuItem>
                </Link>
                <Logout/>
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
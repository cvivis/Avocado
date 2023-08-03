import React from "react";
import {
    Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider,
    Button, Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ProfileBtn() {
    
    return (
        <Menu>
        <MenuButton as={Avatar} colorScheme='green'></MenuButton>
        <MenuList>
            {/* <MenuGroup title='Profile'> */}
            <MenuItem>
                <Link to="/member/MyPage">My Page</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/member/LogIn">Log In</Link>
            </MenuItem>
            <MenuItem>Log Out</MenuItem>
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
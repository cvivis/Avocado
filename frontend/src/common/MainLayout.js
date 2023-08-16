import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import {
    Box, Flex,
} from "@chakra-ui/react"

function MainLayout() {


    return (
        <Flex flexDirection={'column'} h={'100vh'}>
            <Box flex={'1'}>
                <Header/>
                <Outlet/>
            </Box>
            <Footer/>
        </Flex>
    )
}

export default MainLayout;
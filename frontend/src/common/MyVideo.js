import React from "react";
import { Box } from "@chakra-ui/react";
import Openvidu from "../component/openvidu/OnlineMeeting"

function MyVideo() {

    return(
        // 사이즈 추후에 수정
        <Box> 
            <Openvidu />
        </Box>
    )
}

export default MyVideo;
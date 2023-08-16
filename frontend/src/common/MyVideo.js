import React from "react";
import { Box } from "@chakra-ui/react";
import Openvidu from "../component/openvidu/OnlineMeeting"

function MyVideo(props) {
    console.log(props.useId + "마이비디오 유즈아이디이이이")
    return (
        // 사이즈 추후에 수정
        <Box>
            <Openvidu useId={props.useId} />
        </Box>
    )
}

export default MyVideo;
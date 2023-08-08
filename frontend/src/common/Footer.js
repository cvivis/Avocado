import React from "react";
import {
    Box
} from '@chakra-ui/react';

function Footer() {


    return (
        <Box
            as="footer"
            bg="white"
            p={4}
            position="fixed"
            left={0}
            bottom={0}
            width="100%"
            textAlign="center"
            >
            <hr></hr>
            A4용지 팀의 Avocado 프로젝트
            <br/>
            팀장 : 황시은 &nbsp;&nbsp; 백엔드 마스터 : 권민재 &nbsp;&nbsp;
            나무꾼 : 정재현 &nbsp;&nbsp; 라이브 마스터 : 정연수 &nbsp;&nbsp;
            게시판 마스터 : 이원희 &nbsp;&nbsp; 그리고 오승기
        </Box>
    );
}

export default Footer;
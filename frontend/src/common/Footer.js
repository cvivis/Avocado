import React from "react";
import {
    Flex, Box
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
           여기에 푸터 넣을거임. 말리지마셈. 아무도 나를 말릴 수 없으셈. 아무튼 넣을거임.
        </Box>
    );
}

export default Footer;
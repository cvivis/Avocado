import React from "react";
import {
    Box,
    FormControl, Input, InputLeftElement, InputGroup,
    Grid, Center, VStack, Button, Text,
} from "@chakra-ui/react";
import {
    EmailIcon, SunIcon,
} from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import MyPasswordInput from "../../common/MyPasswordInput";

function Regist() {

    return (
        <Grid>
            <Center></Center>
            <VStack>
                <Box mt={50}>
                    <Link to="/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1n2KE9iWPb_CKLzQ3adFwE9aPfJrOXMXYn1lFo8&s" alt="Logo"></img>
                    </Link>
                </Box>
                <FormControl mt={50}>
                    <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                            <EmailIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            placeholder='이메일'
                        />
                    </InputGroup>
                    <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                            <SunIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            placeholder='닉네임'
                        />
                    </InputGroup>
                        {/* 비밀번호 입력 인풋 */}
                    <MyPasswordInput MyPlaceholder={'비밀번호'}></MyPasswordInput>
                    <MyPasswordInput MyPlaceholder={'비밀번호 확인'}></MyPasswordInput>
                    <Button
                        mt={10}
                        colorScheme='green'
                        type='submit'
                        size='lg'
                        w='500px'
                    >
                        <Text>회 원 가 입</Text>
                    </Button>
                </FormControl>
            </VStack>
            <Center></Center>
        </Grid>
    );
}

export default Regist;
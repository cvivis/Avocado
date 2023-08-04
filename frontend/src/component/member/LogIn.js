import React from "react";
import {
    Box,
    FormControl, Input, InputLeftElement, InputGroup,
    Grid, Center, VStack, Button, HStack, Divider, SimpleGrid,
} from "@chakra-ui/react";
import {
    EmailIcon,
} from '@chakra-ui/icons'
import MyPasswordInput from "../../common/MyPasswordInput";

function LogIn(){

    return (
        <Box display="flex" justifyContent="space-between">
        <Grid>
            <Center></Center>
            <Center>
            <VStack>
                <Box mt={50}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1n2KE9iWPb_CKLzQ3adFwE9aPfJrOXMXYn1lFo8&s" alt="Logo"></img>
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
                    {/* 비밀번호 입력 인풋 */}
                    <MyPasswordInput></MyPasswordInput>
                    <Button
                        mt={10}
                        colorScheme='green'
                        type='submit'
                        size='lg'
                        w='500px'
                    >
                        로 그 인
                    </Button>
                    <SimpleGrid>
                        <HStack>
                            <Center w='500px'>
                                <Button background={"white"} size={"sm"} w='200px'>회원 가입</Button>
                                <Divider orientation='vertical' border="1px solid" borderColor='green' height="10px" />
                                <Button background={"white"} size={"sm"} w='200px'>아이디 찾기</Button>
                                <Divider orientation='vertical' border="1px solid" borderColor='green' height="10px" />
                                <Button background={"white"} size={"sm"} w='200px'>비밀번호 찾기</Button>
                            </Center>
                        </HStack>
                    </SimpleGrid>
                </FormControl>
            </VStack>
            </Center>
            <Center></Center>
        </Grid>
        </Box>
    );
}

export default LogIn;
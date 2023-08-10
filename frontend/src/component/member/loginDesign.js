import React from "react";
import {
    Box,
    FormControl, Input, InputLeftElement, InputGroup,
    Grid, Center, VStack, Button, HStack, Divider, SimpleGrid, Text,
    Container,
} from "@chakra-ui/react";
import {
    EmailIcon,
} from '@chakra-ui/icons'
import MyPasswordInput from "../../common/MyPasswordInput";
import { Link } from "react-router-dom";

function LogIn(){

    return (
        <Grid>
            <Container centerContent>
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
                        <MyPasswordInput MyPlaceholder={'비밀번호'}></MyPasswordInput>
                        <Button
                            mt={10}
                            colorScheme='green'
                            type='submit'
                            size='lg'
                            w='500px'
                        >
                            <Text>로 그 인</Text>
                        </Button>
                        <SimpleGrid>
                            <HStack>
                                <Center w='500px' mt={"3"}>
                                    <Button background={"white"} size={"sm"} w='200px' variant="link">
                                        <Link to="/member/Regist">
                                            <Text>회원 가입</Text>
                                        </Link>
                                    </Button>
                                    <Divider orientation='vertical' border="1px solid" borderColor='green' height="10px" />
                                    <Button background={"white"} size={"sm"} w='200px' variant="link">
                                        <Text>아이디 찾기</Text>
                                    </Button>
                                    <Divider orientation='vertical' border="1px solid" borderColor='green' height="10px" />
                                    <Button background={"white"} size={"sm"} w='200px' variant="link">
                                        <Text>비밀번호 찾기</Text>
                                    </Button>
                                </Center>
                            </HStack>
                        </SimpleGrid>
                    </FormControl>
                </VStack>
            </Container>
        </Grid>
    );
}

export default LogIn;

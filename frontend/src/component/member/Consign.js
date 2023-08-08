import React from "react";
import {
    Box, Container, Flex, FormControl, FormLabel,
    HStack, Heading, Input, InputGroup, InputRightAddon, Spacer,
    Textarea, VStack, Text, InputLeftAddon, Divider, FormHelperText, Button, Center,
} from '@chakra-ui/react';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Footer2 from "../../common/Footer-new";
import ToastEditor from "../../common/ToastEditor";
import MyRadioBtn from "../../common/MyRadioBtn";
import Dropzone from "../../common/Dropzone";

function Consign() {

    return (
        <Box>
            {/* <Header /> */}
            <Container centerContent mt={'15px'}>
                {/* 이미지/썸네일/제목/내용/희망가격/즉구가/경매유형 */}
                <Heading size={'3xl'} color={'green'}>물품 입찰 요청서</Heading>
                <FormControl w={'1000px'} mt={'20px'}>
                    <Divider mb={'10px'} border={'1px'} color={'green'} />
                    <InputGroup mb={'10px'}>
                        <Input type="text" placeholder="물품명을 입력해주세요" required />
                    </InputGroup>
                    <HStack mb={'10px'}>
                        <Dropzone />
                        <Spacer />
                        <MyRadioBtn />
                    </HStack>
                    <ToastEditor />
                    <Flex gap={'30px'} mt={'10px'}>
                        <InputGroup>
                            <InputLeftAddon as={'b'} fontSize={'xl'} children='희망 시작가' bg={'green.400'} />
                            <Input _focus={{ boxShadow: 'none' }} type="number" placeholder="희망 시작가를 입력해주세요" required />
                            <InputRightAddon children='원' bg={'green.400'} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon as={'b'} fontSize={'xl'} children='즉시 구매가' bg={'green.400'} />
                            <Input _focus={{ boxShadow: 'none' }} type="number" placeholder="즉시 구매가를 입력해주세요" required />
                            <InputRightAddon children='원' bg={'green.400'} />
                        </InputGroup>
                    </Flex>
                    <Center m={'100px'} >
                        <HStack gap={'20px'}>
                            <Button type="submit" w={'150px'} h={'60px'} bg={'green.400'}>요청</Button>
                            <Button type="reset" w={'150px'} h={'60px'} bg={'red.400'}>취소</Button>
                        </HStack>
                    </Center>
                </FormControl>
            </Container>
            {/* <Footer /> */}
            <Footer2></Footer2>
        </Box>
    );
}

export default Consign;
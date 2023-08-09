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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequireItem } from "../../redux/consignSlice";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Consign() {


    const editorRef = useRef(null);
    const requireItem = useSelector((state) => state.requireItem);
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const navigate = useNavigate();

    const handleConsignRequest = (e) => {
        e.preventDefault();

        // 내용은 길어질 수 있으니까 요청 버튼 눌렀을 때마 리덕스 상태 업데이트
        // => useRef 사용해서 해결
        const content = editorRef.current.getInstance().getMarkdown();
        dispatch(setRequireItem({ content }));

        // 요청 데이터를 requireItem으로부터 가져올 수 있습니다.
        const Data = {
            memberId: requireItem.memberId,
            thumbnail: requireItem.thumbnail,
            name: requireItem.name,
            content: requireItem.content,
            hopePrice: requireItem.hopePrice,
            type: requireItem.Type,
            itemStatus: requireItem.itemStatus,
        };

        // 서버에 POST 요청을 보내 물품 입찰 요청을 처리
        api.post('/items/consign', Data, { headers: { Authorization: accessToken } })
            .then(response => {
                // 응답을 처리하는 로직
                alert(`물품 입찰 요청 성공.`);
                navigate('/');
            })
            .catch(error => {
                console.error('물품 입찰 요청 실패:', error.response.data);
            });
    }


    return (
        <Box>
            {/* <Header /> */}
            <Container centerContent mt={'15px'}>
                {/* 이미지/썸네일/제목/내용/희망가격/즉구가/경매유형 */}
                <Heading size={'3xl'} color={'green'}>물품 입찰 요청서</Heading>
                <FormControl w={'1000px'} mt={'20px'}>
                    <Divider mb={'10px'} border={'1px'} color={'green'} />
                    <InputGroup mb={'10px'}>
                        <Input
                            // 한글자 입력할 때 마다 리덕스 업데이트
                            value={requireItem.name}
                            onChange={(e) => dispatch(setRequireItem({ name: e.target.value }))}
                            type="text" placeholder="물품명을 입력해주세요" required />
                    </InputGroup>
                    <HStack mb={'10px'}>
                        <Dropzone
                            onChange={(thumbnail) => dispatch(setRequireItem({ thumbnail }))}
                        />
                        <Spacer />
                        <MyRadioBtn
                            onChange={(value) => dispatch(setRequireItem({ Type: value }))} />
                    </HStack>
                    <ToastEditor ref={editorRef} />
                    <Flex gap={'30px'} mt={'10px'}>
                        <InputGroup>
                            <InputLeftAddon as={'b'} fontSize={'xl'} children='희망 시작가' bg={'green.400'} />
                            <Input
                                value={requireItem.hopePrice}
                                onChange={(e) => dispatch(setRequireItem({ hopePrice: e.target.value }))}
                                _focus={{ boxShadow: 'none' }} type="number" placeholder="희망 시작가를 입력해주세요" required />
                            <InputRightAddon children='원' bg={'green.400'} />
                        </InputGroup>
                        {/* <InputGroup>
                            <InputLeftAddon as={'b'} fontSize={'xl'} children='즉시 구매가' bg={'green.400'} />
                            <Input _focus={{ boxShadow: 'none' }} type="number" placeholder="즉시 구매가를 입력해주세요" required />
                            <InputRightAddon children='원' bg={'green.400'} />
                        </InputGroup> */}
                    </Flex>
                    <Center m={'100px'} >
                        <HStack gap={'20px'}>
                            <Button onClick={handleConsignRequest} type="submit" w={'150px'} h={'60px'} bg={'green.400'}>요청</Button>
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
import React from "react";
import {
    Box, Divider, HStack, Heading, Flex, Spacer, Button, Text,
} from '@chakra-ui/react';
import { TimeIcon } from "@chakra-ui/icons";
import { right } from "@popperjs/core";


function MyBidInfo() {

    return (
        <Box>
            <Heading size={'2xl'}>
                닌텐도 닝텡동 텐동맛이써
            </Heading>
            <Divider mt={'20px'} border={'1px'} color={'green'} w={'580px'}/>
            <HStack mt={'20px'}>
                <Heading size={'lg'} textAlign={'left'}>
                    시작가
                </Heading>
                <Spacer />
                <Heading size={'lg'} textAlign={'right'}>
                    X 원 {/* 여기에 시작가 프롭스 */}
                </Heading>
            </HStack>
            <HStack  mt={'20px'}>
                <Heading size={'lg'} textAlign={'left'}>
                    현재가 
                </Heading>
                <Spacer />
                <Heading size={'lg'} textAlign={'right'}>
                    X 원 {/* 여기에 현재가 프롭스 */}
                </Heading>
            </HStack>
            <Divider mt={'20px'} border={'1px'} color={'green'} w={'580px'}/>
            <HStack  mt={'20px'}>
                <Heading size={'lg'} textAlign={'left'}>
                    남은 시간
                </Heading>
                <Spacer />
                <TimeIcon boxSize={6}/>
                <Heading size={'lg'} textAlign={'right'}>
                    1일 23 : 49 : 17 {/* 여기에 남은 시간 프롭스 */}
                </Heading>
            </HStack>
            <HStack>
                <Spacer />
                <Button size={'lg'} mt={'20px'} bg={'green.500'} color={'whiteAlpha.900'} _hover={{bg:'green'}} w={'300px'}> {/* 여기에 입찰 기능 버튼 */}
                    <Text textAlign={'left'}>
                        입찰하기
                    </Text>
                    <Spacer />
                    <Text textAlign={'right'}>
                        X 원
                    </Text>
                </Button>
            </HStack>
        </Box>
    )
}

export default MyBidInfo;
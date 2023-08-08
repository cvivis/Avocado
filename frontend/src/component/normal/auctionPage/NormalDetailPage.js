import React from "react";
import {
    Box, Grid, VStack, HStack, GridItem, Container, StackDivider,
} from "@chakra-ui/react"
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import MyCarousel from "../../../common/MyCarousel";
import MyBidInfo from "../../../common/MyBidInfo";


function NormalDetailPage() {


    return (
        <Box>
            <Header />
                <Container centerContent mt={'15px'}>
                    <Grid 
                        templateAreas={`"imageSection titleSection"
                                        "contentSection contentSection"`}
                    >
                        <VStack divider={<StackDivider border={"1px"} borderColor='green' />}>
                            <Box>
                                <HStack>
                                    <GridItem area={'imageSection'} w={'600px'} h={'600px'}>
                                        <Container centerContent>
                                            <MyCarousel />
                                        </Container>
                                    </GridItem>
                                    <GridItem area={'titleSection'} w={'600px'} h={'600px'}>
                                        <Container centerContent>
                                            <MyBidInfo />
                                        </Container>
                                    </GridItem>
                                </HStack>
                            </Box>
                            <Box>
                                <GridItem area={'contentSection'} bg='green.300' w={'1208px'}>
                                    <Container centerContent>
                                        여기에다가 컨텐츠 입력하면 됩니다아아
                                        백그라운드는 지우세요오
                                    </Container>
                                </GridItem>
                            </Box>
                        </VStack>
                    </Grid>
                </Container>
            <Footer />
        </Box>
    );
}

export default NormalDetailPage;
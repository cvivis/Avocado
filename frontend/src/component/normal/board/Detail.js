import React, { useEffect, useState } from "react";
import {
  Box, Grid, VStack, HStack, GridItem, Container, StackDivider,
} from "@chakra-ui/react"
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import MyCarousel from "../../../common/MyCarousel";
import MyBidInfo from "../../../common/MyBidInfo";
import api from "../../../api";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [boardDetail, setboardDetail] = useState('');

  useEffect(() => {
    // API 호출
    api.get(`/normal/detail/${id}`)
      .then(response => {
        setboardDetail(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, [id]);


  return (
    <Box>
      {/* <Header /> */}
      <Container centerContent mt={'15px'}>
        <Grid
          templateAreas={`"imageSection titleSection"
                                        "contentSection contentSection"`}
        >
          <VStack divider={<StackDivider border={"1px"} borderColor='green' />}>
            <Box>
              <HStack>
                <GridItem area={'imageSection'} w={'600px'} h={'600px'}>

                  <MyCarousel height={'600px'} weight={'600px'} />

                </GridItem>
                <GridItem area={'titleSection'} w={'600px'} h={'600px'}>
                  <Container centerContent>
                    <MyBidInfo boardDetail={boardDetail} id={id}
                    />
                  </Container>
                </GridItem>
              </HStack>
            </Box>
            <Box>
              <GridItem area={'contentSection'} w={'1208px'}>
                <Container centerContent>
                  {boardDetail.content}
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

export default Detail;
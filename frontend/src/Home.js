import React from "react"
import { Link } from "react-router-dom";
import {
  Box, Center,
} from "@chakra-ui/react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import MyCarousel from "./common/MyCarousel";

function Home() {
  return (
      <Box>
        <Header />
        <Center>
          <MyCarousel />
        </Center>
        <Footer />
      </Box>
  );
}

export default Home;

import React from "react"
import {
  Box, Center,
} from "@chakra-ui/react";
import MyCarousel from "./common/MyCarousel";

function Home() {
  return (
    <Box>
      <Center>
        <MyCarousel height={1000} weight={900} />
      </Center>
    </Box>
  );
}

export default Home;

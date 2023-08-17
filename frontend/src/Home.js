import React from "react"
import {
  Box, Center,
} from "@chakra-ui/react";
import MyCarousel from "./common/MyCarousel";

function Home() {
  return (
    <Box>
      <Center>
        <MyCarousel height={800} weight={600} />
      </Center>
    </Box>
  );
}

export default Home;

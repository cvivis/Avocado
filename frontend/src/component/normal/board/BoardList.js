import React, { useEffect } from "react";
import api from '../../../api';
import { useDispatch, useSelector } from "react-redux";
import SearchList from "./SearchList";
import { setBoardList, setFilterList } from "../../../redux/boardListSlice";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import {
  Box, Center,
  Grid, VStack, Spacer,
} from "@chakra-ui/react";
import DetailMyCard from "../../../common/DetailMyCard";



function BoardList() {
  const dispatch = useDispatch();
  const filterList = useSelector((state) => state.boardList.filterList);



  useEffect(() => {
    api.get("/normal/list")
      .then(response => {
        // console.log(response.data.entries + "이것은 리스폰스 데이터");
        dispatch(setBoardList(response.data.entries));
        dispatch(setFilterList(response.data.entries));

      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, [dispatch]);

  return (
    <Box>
      <Box h={50}></Box>
      <VStack>
        <SearchList></SearchList>
        <Spacer />
        <Box display="flex" justifyContent="space-between">
          <Center></Center>
          <Grid gap={6} spacing={4} templateColumns='repeat(4, minmax(200px, 1fr))'>
            {/* 카드 반복문 돌릴 예정 */}
            {filterList.map((item) => (
              <DetailMyCard key={item.itemId} item={item} />
            ))}
          </Grid>
          <Center></Center>
        </Box>
      </VStack>
      <Footer></Footer>
    </Box>
  );
}

export default BoardList;



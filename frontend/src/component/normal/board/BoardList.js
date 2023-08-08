import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "./CategoryList";
import SearchList from "./SearchList";
import { setBoardList, setFilterList } from "../../../redux/boardListSlice";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import {
  Box, Center,
  Grid, FormControl, Input, FormHelperText, IconButton,
  HStack, VStack, Spacer,
} from "@chakra-ui/react";
import MyCard from "../../../common/MyCard";
import MySearchBar from "../../../common/MySearchBar";


function BoardList() {
  const dispatch = useDispatch();
  const filterList = useSelector((state) => state.boardList.filterList);
  
  // console.log(filterList);

  useEffect(() => {
    api.get("/normal/list")
      .then(response => {
        // console.log(response.data.entries + "이것은 리스폰스 데이터");
        dispatch(setBoardList(response.data.entries));
        dispatch(setFilterList(response.data.entries));
        // console.log(filterList);
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
              console.log(item.itemId),
              console.log(item.content),
              console.log("아이템아이디 위에꺼"),
              <MyCard key={item.itemId} item={item} />
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

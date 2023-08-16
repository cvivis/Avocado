import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchKeyword, setSearchKeyword } from "../../../redux/searchSlice";
import { loadBoardList, setBoardList, setFilterList } from "../../../redux/boardListSlice";
import api from '../../../api'
import {
  Box, Center,
  Grid, FormControl, Input, FormHelperText, IconButton, HStack, Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import CategoryList from "./CategoryList";
import { clearCategory } from "../../../redux/categorySlice";

function MySearchBar() {
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const doSelect = useSelector((state) => state.category.doSelect);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const boardList = useSelector((state) => state.boardList.boardList);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadBoardList());

    return () => {
      dispatch(resetSearchKeyword());
      dispatch(clearCategory());
    }
  }, [])


  const handleSearch = useCallback(() => {

    if (!doSelect && searchKeyword === '') {
      dispatch(setFilterList(boardList)); // 처음 리스트로 초기화
    } else {
      const categoryAPI = doSelect ? `/normal/list/sort-category?category=${selectedCategory}` : "/normal/list";
      api.get(categoryAPI)
        .then(response => {
          const filterList = response.data.entries.filter(item =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          dispatch(setFilterList(filterList));
        })
        .catch(error => {
          console.error('API 요청 에러:', error);
        });
    }
  }, [dispatch, doSelect, searchKeyword, selectedCategory, boardList]);

  const handleSearchInputChange = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  return (
    <Box>
      <FormControl>
        <HStack>
          <CategoryList></CategoryList>
          <Input type='search'
            color='green'
            placeholder='검색어를 입력하세요'
            _placeholder={{ color: 'inherit' }}
            htmlSize={30}
            width='auto'
            value={searchKeyword}
            onChange={handleSearchInputChange}
          />
          <IconButton
            onClick={handleSearchButtonClick}
            aria-label='Search database'
            colorScheme='green'
            icon={<SearchIcon />}
          />
        </HStack>
      </FormControl>
    </Box>
  );
}

export default MySearchBar;
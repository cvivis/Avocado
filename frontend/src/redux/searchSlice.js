// src/redux/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: [], // initialState를 빈 배열로 수정
  reducers: {
    setSearchResults: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;


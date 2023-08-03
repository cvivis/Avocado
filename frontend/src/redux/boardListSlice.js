// src/redux/searchSlice.js

import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  boardLists : [],
};

const boardListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    setBoardLists(state,action){
      state.boardLists = action.payload;
    }
  },
});

export const { setBoardLists } = boardListSlice.actions;

// 비동기 액션을 처리하는 thunk
export const loadBoardList = () => async (dispatch) => {
  try {
    const response = await api.get("/normal/list");
    dispatch(setBoardLists(response.data.entries));
  } catch (error) {
    console.error('API 요청 에러:', error);
  }
};

export default boardListSlice.reducer;

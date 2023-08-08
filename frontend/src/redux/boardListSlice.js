import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  filterList: [],
  boardList: [],
};

const boardListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    setFilterList(state, action) {
      state.filterList = action.payload;
    },
    setBoardList(state, action) {
      state.boardList = action.payload;
    }
  },
});

export const { setFilterList, setBoardList } = boardListSlice.actions;

// 비동기 액션을 처리하는 thunk
export const loadBoardList = () => async (dispatch) => {
  try {
    const response = await api.get("/normal/list");
    dispatch(setFilterList(response.data.entries));
  } catch (error) {
    console.error('API 요청 에러:', error);
  }
};

export default boardListSlice.reducer;

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
    },
    setBoardAndFilterList(state, action) {
      state.boardList = action.payload;
      state.filterList = action.payload;
    }

  },
});

export const { setFilterList, setBoardList, setBoardAndFilterList } = boardListSlice.actions;

// 비동기 액션을 처리하는 thunk
export const loadBoardList = () => async (dispatch) => {
  console.log("디스패치");
  try {
    const response = await api.get("/normal/list");
    const entries = response.data.entries;
    dispatch(setBoardAndFilterList(entries));
  } catch (error) {
    console.error('API 요청 에러:', error);
  }
};

export default boardListSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchKeyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    setSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    resetSearchKeyword(state) {
      state.searchKeyword = '';
    },
  },
});

export const {
  setSearchKeyword,
  resetSearchKeyword, // 추가된 액션
} = searchSlice.actions;

export default searchSlice.reducer;

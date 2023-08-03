import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: '',
  doSelect: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      if (state.selectedCategory === action.payload) {
        state.selectedCategory = '';
      } else {
        state.selectedCategory = action.payload;
      }
    },
    setDoSelect: (state, action) => {
      state.doSelect = action.payload;
    }
  },
});

export const { setSelectedCategory, setDoSelect } = categorySlice.actions;

export default categorySlice.reducer;

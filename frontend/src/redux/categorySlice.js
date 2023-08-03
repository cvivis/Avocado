import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory} = categorySlice.actions;

export default categorySlice.reducer;

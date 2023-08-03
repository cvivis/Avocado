import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: '',
  doSelect : false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setDoSelect(state){
      state.doSelect = true;
    }
  },
});

export const { setSelectedCategory, setDoSelect} = categorySlice.actions;

export default categorySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  pw: '',
  isLogin : false,
  user : null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
      }
    },
    setUser: (state, action) => {
      state.User = action.payload;
    }
  },
);

export const { setIsLogin, setUser } = loginSlice.actions;

export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  isLogin: false,
  member: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
    resetLoginForm: () => {
      return {
        email: initialState.email,
        password: initialState.password,
        isLogin: initialState.isLogin,
        member: initialState.member,
      };
    },
  },
});

export const { setMember, setIsLogin, resetLoginForm, setEmail, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
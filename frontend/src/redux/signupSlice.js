import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email : '',
    password : '',
    nickname :'',
}
const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
  
      setEmail(state, action) {
        state.email = action.payload;
      },
      setPassword(state, action) {
        state.password = action.payload;
      },
      setNickname(state, action) {
        state.nickname = action.payload;
      },
    },
  });
  
  export const {
    setEmail,
    setPassword,
    setNickname
  } = signupSlice.actions;
  
  export default signupSlice.reducer;
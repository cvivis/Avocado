
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import categorySlice from "./categorySlice";
import boardListSlice from "./boardListSlice";
import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";
import consignSlice from "./consignSlice";
// import itemReducer from "./itemSlice";
// configureStore : 스토어 생성
const store = configureStore({
  // 리듀서 등록
  reducer: {
    // search라는 이름으로 searchSlice.js에서 정의한 리듀서 등록
    // item : itemReducer,
    boardList: boardListSlice,
    search: searchSlice,
    category: categorySlice,
    login: loginSlice,
    signup: signupSlice,
    requireItem: consignSlice,
  },
});

export default store;

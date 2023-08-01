
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
// configureStore : 스토어 생성
const store = configureStore({
  // 리듀서 등록
  reducer: {
    // search라는 이름으로 searchSlice.js에서 정의한 리듀서 등록
    search: searchReducer,
  },
});

export default store;

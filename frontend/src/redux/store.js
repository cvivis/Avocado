
import { configureStore } from "@reduxjs/toolkit";
import boardListReducer from "./boardListSlice";
import searchSlice from "./searchSlice";
import categorySlice from "./categorySlice";
// import itemReducer from "./itemSlice";
// configureStore : 스토어 생성
const store = configureStore({
  // 리듀서 등록
  reducer: {
    // search라는 이름으로 searchSlice.js에서 정의한 리듀서 등록
    // item : itemReducer,
    boardList: boardListReducer,
    search : searchSlice,
    category : categorySlice,
  },
});

export default store;

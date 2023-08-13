
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import categorySlice from "./categorySlice";
import boardListSlice from "./boardListSlice";
import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";
import consignSlice from "./consignSlice";
import myNormalBidsSlice from "./myNormalBidsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import broadcastListSlice from "./broadcastListSlice";
import mySuccessNormalbidsSlice from "./mySuccessNormalbidsSlice";
import myNormalSaleSlice from "./myNormalSaleSlice";
import myLiveBidsSlice from "./myLiveBidsSlice";
import mySuccessLiveBidsSlice from "./mySuccessLiveBidsSlice";



const reducers = combineReducers({
  boardList: boardListSlice,
  search: searchSlice,
  category: categorySlice,
  login: loginSlice,
  signup: signupSlice,
  requireItem: consignSlice,
  myNormalBids: myNormalBidsSlice,
  broadcastList: broadcastListSlice,
  mySuccessNormalBids: mySuccessNormalbidsSlice,
  myNormalSale: myNormalSaleSlice,
  myLiveBids: myLiveBidsSlice,
  mySuccessLiveBids: mySuccessLiveBidsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"]
};


const persistedReducer = persistReducer(persistConfig, reducers);

// {
//   // search라는 이름으로 searchSlice.js에서 정의한 리듀서 등록
//   // item : itemReducer,
//   boardList: boardListSlice,
//   search: searchSlice,
//   category: categorySlice,
//   login: loginSlice,
//   signup: signupSlice,
//   myNormalBids:myNormalBidsSlice,
//   reducer:persistedReducer,
// },

// import itemReducer from "./itemSlice";
// configureStore : 스토어 생성
const store = configureStore({
  // 리듀서 등록
  reducer: persistedReducer,
  // getDefaultMiddleware로 기본 미들웨어를 포함하고 로거 추가
});

export default store;

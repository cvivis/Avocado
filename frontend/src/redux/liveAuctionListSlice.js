import { createSlice } from "@reduxjs/toolkit";

const initialState={
    liveAuctionList:[],

};

const liveAuctionListSlice = createSlice({
    name: 'liveAuctionList',
    initialState,
    reducers:{
        setLiveAuctionList(state,action){
            state.liveAuctionList=action.payload;
        }
    },
});

export const{setLiveAuctionList}= liveAuctionListSlice.actions;

export default liveAuctionListSlice.reducer;
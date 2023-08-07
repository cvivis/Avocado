import { createSlice } from "@reduxjs/toolkit";

const initialState={
    broadcastingLiveAuctions:[],

};

const broadcastingLiveAuctions= createSlice({
    name: 'broadcastingLiveAuctions',
    initialState,
    reducers:{
        setBroadcastingLiveAuctions(state,action){
            state.broadcastingLiveAuctions=action.payload;
        }
    },
});

export const {setBroadcastingLiveAuctions} = broadcastingLiveAuctions.actions;

export default broadcastingLiveAuctions.reducer;
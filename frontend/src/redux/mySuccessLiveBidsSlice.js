import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mySuccessLiveBids:[],
};

const mySuccessLiveBids = createSlice({
    name:'mySuccessLiveBids',
    initialState,
    reducers:{
        setMySuccessLiveBids(state,action){
            state.mySuccessLiveBids = action.payload;

        }
    },
});

export const {setMySuccessLiveBids}= mySuccessLiveBids.actions;

export default mySuccessLiveBids.reducer;
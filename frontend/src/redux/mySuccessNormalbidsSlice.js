import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    mySuccessNormalBids:[], 
};

const mySuccessNormalBids = createSlice({
    name :'mySuccessNormalBids',
    initialState,
    reducers:{
        setMySuccessNormalBids(state,action){
            state.mySuccessNormalBids= action.payload;
        }
    },
});

export const {setMySuccessNormalBids}= mySuccessNormalBids.actions;

export default mySuccessNormalBids.reducer;
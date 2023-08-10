import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    myNormalBids:[],
};

const myNormalBids = createSlice({
    name : 'myNormalBids',
    initialState,
    reducers:{
        setMyNormalBids(state,action){
            state.myNormalBids = action.payload;
        }

    },
});

export const {setMyNormalBids} = myNormalBids.actions;

export default myNormalBids.reducer;
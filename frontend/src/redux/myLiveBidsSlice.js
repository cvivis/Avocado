import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    myLiveBids:[],
};

const myLiveBids = createSlice({
    name:'myLiveBids',
    initialState,
    reducers:{
        setMyLiveBids(state,action){
            state.myLiveBids =  action.payload;

        }
    },
});

export const {setMyLiveBids} = myLiveBids.actions;

export default myLiveBids.reducer;
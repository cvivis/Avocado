import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    myNormalSale:[],
};

const myNormalSale = createSlice({
    name: 'myNormalSale',
    initialState,
    reducers:{
        setMyNormalSale(state,action){
            state.myNormalSale=action.payload;
        }
    },
});

export const{setMyNormalSale} = myNormalSale.actions;

export default myNormalSale.reducer;
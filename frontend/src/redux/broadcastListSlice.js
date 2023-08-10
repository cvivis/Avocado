import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    broadcastList:[],
};

const broadcastList = createSlice({
    name: 'broadcastList',
    initialState,
    reducers:{
        setBroadcastList(state,action){
            state.broadcastList = action.payload;
        }
    },
});

export const {setBroadcastList} = broadcastList.actions;
export default broadcastList.reducer;
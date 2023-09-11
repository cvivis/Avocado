import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    broadcastId:0,
};

const broadcastIdSlice = createSlice({
    name: 'broadcastId',
    initialState,
    reducers:{
        setBroadcastId(state,action){
            state.broadcastId = action.payload;
        }
    },

});

export const {setBroadcastId} =broadcastIdSlice.actions;
export default broadcastIdSlice.reducer;
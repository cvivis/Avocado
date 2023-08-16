import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myNormalBids: [],
    isBidEnd: {},
    isBidBeforeStart: {}
};

const myNormalBidSlice = createSlice({
    name: 'myNormalBids',
    initialState,
    reducers: {
        setMyNormalBids(state, action) {
            state.myNormalBids = action.payload;
        },
        setIsBidEnd(state, action) {
            const { id, value } = action.payload;
            state.isBidEnd[id] = value;
        },
        setIsBidBeforeStart(state, action) {
            const { id, value } = action.payload;
            state.isBidBeforeStart[id] = value;
        },


    },
});

export const { setMyNormalBids, setIsBidEnd, setIsBidBeforeStart } = myNormalBidSlice.actions;

export default myNormalBidSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const consignSlice = createSlice({
    name: 'requireItem',
    initialState: {
        memberId: 0,
        thumbnail: "",
        name: "",
        content: "",
        hopePrice: 0,
        Type: "",
        ItemStatus: "",
    },
    reducers: {
        setRequireItem: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setRequireItem } = consignSlice.actions;
export default consignSlice.reducer;

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

// export const loadBroadcastList= () =>async (dispatch) =>{
//     try{
//         const response = await api.get("/live/list");
//         dispatch(setBroadcastList(response.data.entries));
//     } catch(error){
//         console.error('API 요청 에러: ',error);

//     }
// };
export default broadcastList.reducer;
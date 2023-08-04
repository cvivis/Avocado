import {configureStore} from "@reduxjs/toolkit";
import broadcastListSlice from "./broadcastListSlice";
import liveAuctionListSlice from "./liveAuctionListSlice";
import broadcastingLiveAuctionsSlice from "./broadcastingLiveAuctionsSlice";

const store = configureStore({
    reducer:{
        broadcastList:broadcastListSlice,
        liveAuctionList:liveAuctionListSlice,
        broadcastingLiveAuctions: broadcastingLiveAuctionsSlice,
    },
});

export default store;
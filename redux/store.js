import { configureStore } from "@reduxjs/toolkit";
import locationAutoCompleteReducer from "./locationAutoCompleteSlice";
import placeSlice from "./placeSlice";
import detailSlice from "./detailSlice";
import discoverSlice from "./discoverSlice";
import globalSlice from "./globalSlice";
import authSlice from "./authSlice";

export default configureStore({
    reducer: {
        location: locationAutoCompleteReducer,
        place: placeSlice,
        detail: detailSlice,
        discover: discoverSlice,
        global: globalSlice,
        auth: authSlice,
    },
});

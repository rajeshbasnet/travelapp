import { configureStore } from "@reduxjs/toolkit";
import locationAutoCompleteReducer from "./locationAutoCompleteSlice";
import placeSlice from "./placeSlice";

export default configureStore({
    reducer: {
        location: locationAutoCompleteReducer,
        place: placeSlice,
    },
});

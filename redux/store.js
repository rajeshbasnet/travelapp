import { configureStore } from "@reduxjs/toolkit";
import locationAutoCompleteReducer from "./locationAutoCompleteSlice";

export default configureStore({
    reducer: {
        location: locationAutoCompleteReducer,
    },
});

import { createSlice } from "@reduxjs/toolkit";

export const locationAutoCompleteSlice = createSlice({
    name: "locationAutoComplete",
    initialState: {
        show: false,
        locations: [],
    },
    reducers: {
        setLocation: (state, action) => {
            state.locations = action.payload;
        },
        hideAutoComplete: (state) => {
            state.show = false;
        },
        showAutoComplete: (state) => {
            state.show = true;
        },
    },
});

export const { setLocation, showAutoComplete, hideAutoComplete } = locationAutoCompleteSlice.actions;
export default locationAutoCompleteSlice.reducer;

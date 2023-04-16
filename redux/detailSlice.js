import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
    name: "detail",
    initialState: {
        showAbout: false,
    },
    reducers: {
        setAbout: (state) => {
            state.showAbout = !state.showAbout;
        },
        hideAbout: (state) => {
            state.showAbout = false;
        },
    },
});

export const { setAbout, hideAbout } = detailSlice.actions;
export default detailSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const discoverSlice = createSlice({
    name: "discover",
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = discoverSlice.actions;

export default discoverSlice.reducer;

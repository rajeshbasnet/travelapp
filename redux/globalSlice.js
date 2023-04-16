import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        location: {},
        show: false,
        loading: true,
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLocation, setLoading } = globalSlice.actions;

export default globalSlice.reducer;

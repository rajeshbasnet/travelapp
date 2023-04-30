import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        location: {},
        show: false,
        loading: true,
        success: "",
        error: "",
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLocation, setLoading, setSuccess, setError } =
    globalSlice.actions;

export default globalSlice.reducer;

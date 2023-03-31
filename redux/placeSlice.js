import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
    name: "places",
    initialState: {
        hotels: [],
        restaurants: [],
        attractions: [],
    },
    reducers: {
        setHotels: (state, action) => {
            state.hotels = action.payload;
        },
        setResturants: (state, action) => {
            state.resturants = action.payload;
        },
        setAttractions: (state, action) => {
            state.attractions = action.payload;
        },
    },
});

export const { setHotels, setResturants, setAttractions } = placeSlice.actions;

export default placeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        vendorDetail: {
            rating: 0,
            tags: "",
            rankingDetails: "",
            title: "",
            price: "",
            address: "",
            gettingThere: [],
            about: "",
            restaurantsNearby: [],
            attractionsNearby: [],
            amenitiesScreen: "",
            geoPoint: {
                latitude: "",
                longitude: "",
            },
            photos: [],
            reviews: {
                ratingValue: 5,
                content: [],
            },
        },
        isValidated: false,
        vendorUsername: "",
    },
    reducers: {
        setVendorDetail: (state, action) => {
            state.vendorDetail = action.payload;
        },
        setIsValidated: (state, action) => {
            state.isValidated = action.payload;
        },
        setVendorUsername: (state, action) => {
            state.vendorUsername = action.payload;
        },
    },
});

export const { setVendorDetail, setIsValidated, setVendorUsername } =
    hotelSlice.actions;

export default hotelSlice.reducer;

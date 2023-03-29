import axios from "axios";

export const getLocationData = async (searchQuery) => {
    const uri = "https://api.locationiq.com/v1/autocomplete?key=pk.af24012aa2a8e12eb18b85f9011adcb3";
    const options = {
        params: {
            q: searchQuery,
            limit: 10,
            dedupe: 1,
        },
    };

    const response = await axios.get(uri, options);
    return await response.data;
};

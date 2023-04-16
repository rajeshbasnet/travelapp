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

export const getAttractions = async (lat, lon) => {
    const options = {
        method: "GET",
        url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
        params: {
            radius: "5000",
            lon: `${lon}`,
            lat: `${lat}`,
            kinds: "interesting_places",
            limit: 10,
            src_attr: "wikidata",
            rate: "3h",
        },
        headers: {
            "X-RapidAPI-Key": "f8989c032cmsh17e814c38b589e9p1cde87jsn81f7d760b378",
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
    };

    const response = await axios.request(options);
    return response.data.features;
};

export const fetchXID = (attractions) => {
    return attractions.map((attraction) => attraction.properties.xid);
};

export const getAttractionDetails = async (id) => {
    const options = {
        method: "GET",
        url: `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${id}`,
        headers: {
            "X-RapidAPI-Key": "f8989c032cmsh17e814c38b589e9p1cde87jsn81f7d760b378",
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
    };
    const response = await axios.request(options);
    return response.data;
};

export const getAttractionDetail = async (id) => {
    const options = {
        method: "GET",
        url: `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${id}`,
        headers: {
            "X-RapidAPI-Key": "f8989c032cmsh17e814c38b589e9p1cde87jsn81f7d760b378",
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
    };
    const response = await axios.request(options);
    const {
        xid,
        name,
        address: { country, road },
        preview: { source },
    } = response.data;
    return {
        xid,
        name,
        country,
        road,
        source,
    };
};

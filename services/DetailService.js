import axios from "axios";

export const getHotelDetails = async (id) => {
    try {
        const uri = `http://10.0.2.2:8080/hotels/${id}`;

        const response = await axios.get(uri);
        const data = await response.data;

        const {
            rating,
            tags,
            rankingDetails,
            title,
            price,
            address,
            gettingThere,
            about,
            restaurantsNearby,
            attractionsNearby,
            amenitiesScreen,
            geoPoint,
            photos,
            reviews,
        } = data;

        return {
            id,
            rating,
            tags,
            rankingDetails,
            title,
            price,
            address,
            gettingThere,
            about,
            restaurantsNearby,
            attractionsNearby,
            amenitiesScreen,
            geoPoint,
            photos,
            reviews,
        };
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

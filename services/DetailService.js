import axios from "axios";

export const getHotelDetails = async (id) => {
    try {
        const uri = `http://10.0.2.2:8080/hotels/${id}`;

        const response = await axios.get(uri);
        const data = await response.data;

        const { rating, title, rankingDetails } = data.map;
        let restaurantNearByList = data.map.restaurantsNearby.map.content.myArrayList;
        let attractionNearByList = data.map.attractionsNearby.map.content.myArrayList;
        let about = data.map.about.map;
        let photos = data.map.photos.myArrayList;
        let amenitiesScreen = data.map.amenitiesScreen.myArrayList;
        let reviews = data.map.reviews.map.content.myArrayList;
        let price = data.map.price.map.displayPrice;
        return { rating, title, rankingDetails, restaurantNearByList, attractionNearByList, about, photos, amenitiesScreen, reviews, price };
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

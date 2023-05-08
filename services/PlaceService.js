import axios from "axios";
import { removeUnneccessaryTitle } from "../utility/Util";

export const getHotels = async () => {
    try {
        const uri = `http://10.0.2.2:8080/hotels`;
        const response = await axios.get(uri);
        return [...response.data].map((data) => {
            let title = removeUnneccessaryTitle(data.title);
            let {
                id,
                priceForDisplay,
                primaryInfo,
                bubbleRating: { rating },
            } = data;

            let urlTemplate = data.cardPhotos[0];

            return {
                id,
                title,
                priceForDisplay,
                primaryInfo,
                urlTemplate,
                rating,
            };
        });
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

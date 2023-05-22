import axios from "axios";
import { removeUnneccessaryTitle } from "../utility/Util";

export const getHotels = async () => {
    try {
        const uri = `http://10.0.2.2:8080/es/hotels`;

        const response = await axios.get(uri);

        console.log(response.data.length);

        return [...response.data].map((data) => {
            let title = removeUnneccessaryTitle(data.title);
            let {
                hotelId,
                priceForDisplay,
                primaryInfo,
                bubbleRating: { rating },
                registered,
            } = data;

            let urlTemplate =
                data?.cardPhotos?.length > 0
                    ? data.cardPhotos[0]
                    : "https://firebasestorage.googleapis.com/v0/b/travelapp-53573.appspot.com/o/hotel.png?alt=media&token=ed222b7a-e2ee-42b6-9acb-003b62e6d65d";

            return {
                id: hotelId,
                title,
                priceForDisplay,
                primaryInfo,
                urlTemplate,
                rating,
                registered,
            };
        });
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

export const getHotelsByAddress = async (place_name) => {
    try {
        const uri = `http://10.0.2.2:8080/hotels/column`;
        const response = await axios.post(
            uri,
            {},
            {
                params: {
                    column: "primaryInfo",
                    value: place_name,
                },
            }
        );

        return [...response.data].map((data) => {
            let title = removeUnneccessaryTitle(data.title);
            let {
                hotelId,
                priceForDisplay,
                primaryInfo,
                bubbleRating: { rating },
                registered,
            } = data;

            let urlTemplate =
                data?.cardPhotos?.length > 0
                    ? data.cardPhotos[0]
                    : "https://firebasestorage.googleapis.com/v0/b/travelapp-53573.appspot.com/o/hotel.png?alt=media&token=ed222b7a-e2ee-42b6-9acb-003b62e6d65d";

            return {
                id: hotelId,
                title,
                priceForDisplay,
                primaryInfo,
                urlTemplate,
                rating,
                registered,
            };
        });
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

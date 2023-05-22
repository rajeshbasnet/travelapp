import axios from "axios";

function makeIdFromNumber(length) {
    let result = "";
    const characters = "1234567890";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

export async function indexHotelDetails(hotelDetail, vendorUsername) {
    let id = makeIdFromNumber(8);

    let url = "http://10.0.2.2:8080/hotels";

    let detailUrl = "http://10.0.2.2:8080/hotels/detail";

    const { title, photos, price, rating } = hotelDetail;

    const hotel = {
        hotelId: id,
        title,
        primaryInfo: "Kathmandu",
        secondaryInfo: "",
        badge: {},
        bubbleRating: {
            count: 0,
            rating,
        },
        isSponsored: false,
        accentedLabel: false,
        provider: "none",
        priceForDisplay: price,
        priceDetails: null,
        priceSummary: null,
        cardPhotos: photos,
        registered: "custom",
    };

    if (id) {
        try {
            const response = await axios.post(url, hotel);

            if (response) {
                const response = await axios.post(detailUrl, {
                    ...hotelDetail,
                    id,
                    username: vendorUsername,
                });

                return response;
            }
        } catch (error) {
            throw error;
        }
    }
}

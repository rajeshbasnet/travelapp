import axios from "axios";

export const getPlaces = async (collection) => {
    const uri = `http://10.0.2.2:8080/index/${collection}`;
    const response = await axios.get(uri);
    return [...response.data].map((data) => {
        let {
            name,
            timezone,
            photo: {
                images: { small },
            },
            photo: {
                images: { large },
            },
            price,
            ranking_category,
            num_reviews,
        } = data;

        const smallUrl = small.url;
        const largeUrl = large.url;

        return { name, timezone, smallUrl, largeUrl, price, ranking_category, num_reviews };
    });
};

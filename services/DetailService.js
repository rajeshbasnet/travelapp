import axios from "axios";

export const getHotelDetails = async (id) => {
    try {
        const uri = `http://10.0.2.2:8080/hotels/${id}`;

        const response = await axios.get(uri);
        const data = await response.data;

        const {
            rating,
            tags,
            title,
            price,
            address,
            about,
            amenitiesScreen,
            geoPoint,
            photos,
            reviews,
        } = data;

        return {
            id,
            rating,
            tags,
            title,
            price,
            address,
            about,
            amenitiesScreen,
            geoPoint,
            photos,
            reviews,
        };
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

export const getHotelDetailsWithoutDest = async (id) => {
    try {
        const uri = `http://10.0.2.2:8080/hotels/${id}`;

        const response = await axios.get(uri);
        return await response.data;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

export const updateHotelDetails = async (id, details) => {
    try {
        const uri = `http://10.0.2.2:8080/hotels/details/${id}`;

        const response = await axios.put(uri, details);
        return await response.data;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

export const sendMessage = async (message) => {
    console.log(message);
    try {
        let data = JSON.stringify({
            messages: [
                {
                    body: message,
                    to: "+977 9802331837",
                    from: "+977 9861903882",
                },
            ],
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://rest.clicksend.com/v3/sms/send",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic cmFqZXNoa2hhcGF0YXJpYmFzbmV0MTIzQGdtYWlsLmNvbTowRDBENDQzRi01MUEzLUMyQTItRTQxMC1BMUZENkU0MTNCNDk=",
            },
            data: data,
        };

        const response = await axios.request(config);
        return response?.data?.response_msg;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

import axios from "axios";
import jwtDecode from "jwt-decode";
import { USER, VENDOR } from "../constants/GlobalConstants";

export const authenticateUser = async (username, password) => {
    try {
        const url = "http://10.0.2.2:8080/user/login";
        const response = await axios.post(url, {
            username,
            password,
            role: "USER",
        });
        return response.data?.token;
    } catch (error) {
        throw new Error(error);
    }
};

export const registerUser = async (userInfo) => {
    try {
        const url = "http://10.0.2.2:8080/user/register";
        const response = await axios.post(url, userInfo);
        return response.data?.message;
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserFromUsername = async (username) => {
    try {
        const url = "http://10.0.2.2:8080/user/info";
        const response = await axios.post(
            url,
            {},
            {
                params: {
                    username,
                },
            }
        );
        return response && response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, userInfo) => {
    try {
        const url = `http://10.0.2.2:8080/user/${id}`;

        const response = await axios.put(url, { ...userInfo, role: "USER" });
        return response && response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserWithoutPWChange = async (id, userInfo) => {
    try {
        const url = `http://10.0.2.2:8080/user/pw/${id}`;
        const response = await axios.put(url, { ...userInfo, role: "USER" });
        return response && response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserFromToken = async (token) => {
    try {
        const decodedValue = jwtDecode(token);
        console.log(decodedValue);
        const { sub } = decodedValue;

        const url = "http://10.0.2.2:8080/user/info";
        const response = await axios.post(
            url,
            {},
            {
                params: {
                    username: sub,
                },
            }
        );
        return response && response.data;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
};

export const validatePhoneNumber = async (number) => {
    const options = {
        method: "GET",
        url: "https://validate-phone-by-api-ninjas.p.rapidapi.com/v1/validatephone",
        params: {
            number,
        },
        headers: {
            "X-RapidAPI-Key":
                "665ed183a1mshd0ceb5e6668545bp1d8696jsne22232aae628",
            "X-RapidAPI-Host": "validate-phone-by-api-ninjas.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.is_valid;
    } catch (error) {
        JSON.stringify(error);
    }
};

export const isUser = (token) => {
    const decodedValue = jwtDecode(token);
    const { role } = decodedValue;
    return role === USER;
};

export const isVendor = (token) => {
    const decodedValue = jwtDecode(token);
    const { role } = decodedValue;
    console.log(role);
    return role === VENDOR;
};

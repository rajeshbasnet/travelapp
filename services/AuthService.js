import axios from "axios";

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

export const registerUser = async (username, password, number) => {
    console.log(username, password, number);
    try {
        const url = "http://10.0.2.2:8080/user/register";
        const response = await axios.post(url, {
            username,
            password,
            role: "USER",
            number,
        });
        return response.data?.message;
    } catch (error) {
        throw new Error(error);
    }
};

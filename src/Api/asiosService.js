
import axios from "axios"

const baseURL = "http://localhost:9695"

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/app/users/login`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
}



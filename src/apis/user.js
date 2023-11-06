import axios from "axios"

import { API_URL } from "../config"



export const userLogin = async (formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await axios.post(`${API_URL}/user/login`, formData, config);
}

export const getUser = async (token) => {
    const config = {
        headers: {
            "Authorization": token,
        },
    };
    return await axios.get(`${API_URL}/user/singleUser`, config);
}
export const getUsers = async (token) =>{
    const config = {
        headers: {
            "Authorization": token,
        },
    };
    return await axios.get(`${API_URL}/user/allusers`, config);
}
export const removeUser = async (id,token) => {
    const config = {
        headers: {
            "Authorization": token,
        },
    };
    return await axios.delete(`${API_URL}/user/delete?userId=${id}`, config);
}
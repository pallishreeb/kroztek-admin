import axios from "axios"

import { API_URL } from "../config"


export const userRegister = async (formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await axios.post(`${API_URL}/user/register`, formData, config);
}

export const userLogin = async (formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await axios.post(`${API_URL}/user/login`, formData, config);
}

export const userVerify = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await axios.post(`${API_URL}/user/verifyEmail`, data, config);
}

export const resendOTP = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await axios.post(`${API_URL}/user/sendOTP`, data, config);
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

export const activeOrDeactiveUser = async (id,token) => {
    const config = {
        headers: {
            "Authorization": token,
        },
    };
    return await axios.put(`${API_URL}/user/delete?userId=${id}`, config);
}

export const updateUserPermission = async (data,token) => {
    const config = {
        headers: {
            "Authorization": token,
        },
    };
    return await axios.put(`${API_URL}/user/update-permission`, data, config);
}

export const getUsersToedit = async (id,token) =>{
    const config = {
        headers: {
            "Authorization": token,
        },
    };
    return await axios.get(`${API_URL}/user/get-user?id=${id}`, config);
}
/** @format */

import axios from "axios";
import {
    API_URL,
} from "../config";

export const createPost = async (token, form) => {
    const headers = {
        authorization: token,
        'Content-Type': 'multipart/form-data',
    };
    return await axios.post(`${API_URL}/product/add`, form, { headers });
};
export const editPost = async (id, token, form) => {
    const headers = {
        authorization: token,
    };
    return await axios.put(`${API_URL}/product/edit?productId=${id}`, form, {
        headers,
    });
};
export const editStatus= async (id, token, status) => {

    const headers = {
        authorization: token,
    };
    return await axios.put(`${API_URL}/product/editstatus?productId=${id}`, {status}, {
        headers,
    });
};
export const getPost = async (id, token) => {
    const headers = {
        authorization: token,
    };
    return await axios.get(`${API_URL}/product/singlePost?productId=${id}`, {
        headers,
    });
};

export const getPosts = async (token) => {
    const headers = {
        authorization: token,
    };

    return await axios.get(`${API_URL}/product/allproducts`, { headers });
};

export const deletePost = async (token, id) => {
    const headers = {
        authorization: token,
    };
    return await axios.delete(`${API_URL}/product/delete?productId=${id}`, { headers });
};
export const deleteImg = async (productId, imageName) => {
 
    return  await axios.delete(`${API_URL}/product/remove-img`, {
        data: { productId, imageName },
      });
};
export const deleteDoc = async (productId, docName) => {
 
    return  await axios.delete(`${API_URL}/product/remove-doc`, {
        data: { productId, docName },
      });
};
export const getStatisticsData = async (token) => {
    const headers = {
        authorization: token,
    };

    return await axios.get(`${API_URL}/product/statistics`, { headers });
};

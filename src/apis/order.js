import axios from "axios"

import { API_URL } from "../config"


export const getAllOrders = async (token) => {
    const headers = {
        authorization: token,
    };
    const response = await axios.get(`${API_URL}/order/`,{
        headers,
    });
    return response.data;
  };


  export const updateOrder = async (token,orderId, updatedData) => {
    const headers = {
        authorization: token,
    };
    const response = await axios.put(`${API_URL}/order/${orderId}`, updatedData,{
        headers,
    });
    return response.data;
  };


  export const deleteOrder = async (token,orderId) => {
    const headers = {
        authorization: token,
    };
    await axios.delete(`${API_URL}/order/${orderId}`,{
        headers,
    });
  };
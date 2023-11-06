import axios from "axios";
import { API_URL } from "../config"
export const createMetadata = async (data, token) => {
    const headers = {
        authorization: token
    }
    return await axios.post(`${API_URL}/metadata/add`, data, { headers });
}
export const editMetadata = async (id, token, data) => {
    console.log(data);
    const headers = {
        authorization: token
    }
    return await axios.put(`${API_URL}/metadata/edit?metadataId=${id}`, data, { headers });
}

export const getMetadata = async () => {
    return await axios.get(`${API_URL}/metadata/`);
}

export const getMetadataForEdit = async (id, token) => {
    const headers = {
        authorization: token
    }

    return await axios.get(`${API_URL}/metadata/one?metadataId=${id}`, { headers });
}

export const deleteMetadata = async (token, id) => {
    const headers = {
        authorization: token
    }
    return await axios.delete(`${API_URL}/metadata/delete?metadataId=${id}`, { headers });
}
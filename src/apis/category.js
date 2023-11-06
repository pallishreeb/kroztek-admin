import axios from "axios"

import { API_URL } from "../config"



export const getCategories = async (token) => {
    
    const headers = {
        authorization: token
    }
    return await axios.get(API_URL + '/category/', {
        headers
    })
}

export const addCategory = async (token,form) => {

    const headers = {
        authorization: token
    }
    return await axios.post(API_URL + '/category/add',form ,{
        headers
    });
}
export const editCategory = async (token,form) => {

    const headers = {
        authorization: token
    }
    return await axios.put(API_URL + '/category/edit', form, {
        headers
    });
}
export const editCategoryStatus = async (token,form) => {

    const headers = {
        authorization: token
    }
    return await axios.put(API_URL + '/category/editstatus', form, {
        headers
    });
}
export const editSubCategoryStatus = async (token,form) => {

    const headers = {
        authorization: token
    }
    return await axios.put(API_URL + '/category/editsubstatus', form, {
        headers
    });
}
export const deleteCategory = async (id,token) => {

    const headers = {
        authorization: token
    }
    return await axios.delete(API_URL + `/category/delete?categoryId=${id}`,  {
        headers
    });
}


export const getSubCategories = async (categoryId,token) => {
    
    const headers = {
        Authorization: token
    }
    return await axios.get(API_URL + `/category/subs/category?categoryId=${categoryId}`, {
        headers
    })
}
// get all subcategories
export const getAllSubCategories = async ( token) => {

    const headers = {
        Authorization: token
    }
    return await axios.get(API_URL + `/category/allsubs`, {
        headers
    })
}
// create subcategory
export const addSubCategory = async (form, token) => {

    const headers = {
        Authorization: token
    }
    return await axios.post(API_URL + `/category/add/subcategory`, form,{
        headers
    })
}
// update subcategory
export const editSubCategory = async (form, token) => {

    const headers = {
        Authorization: token
    }
    return await axios.put(API_URL + `/category/sub/edit`, form, {
        headers
    })
}

// delete subcategory
export const deleteSubCategory = async ( id,token) => {

    const headers = {
        Authorization: token
    }
    return await axios.delete(API_URL + `/category/sub/delete?subId=${id}`, {
        headers
    })
}
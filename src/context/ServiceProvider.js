/** @format */

import { createContext, useState } from "react";
import { toast } from "react-toastify"
import {
  createPost ,
  getPost,
  getPosts,
  deletePost
} from "../apis/service";

export const ServiceContext = createContext();

const ServiceProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);


//delete Product
const deleteSinglePost = (token, id) => {
    setLoading(true)
    deletePost(token, id)
      .then((res) => {
        setProducts(products.filter((item) => item._id !== id));
        setLoading(false)
        toast.success("Post Deleting Successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        toast.error("Error in Deleting the Post")
      });
};
// Load to be edit product
const getSinglePost = (id, token) => {
      setLoading(true)
      getPost(id, token)
        .then((res) => {
          setProductDetails(res?.data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error in Fetching Posts");
          setLoading(false)
        });
};
 // Load Products
 const getAllPosts = async (token) => {
      setLoading(true)
      try {
        const res = await getPosts(token);
        setProducts(res?.data);
        setLoading(false)
      } catch (error) {
        toast.error("Error in Fetching Posts");
        setLoading(false)
        console.log(error);
      }
};
//new functions for products
const addProduct = (product,token,navigate) =>{
  console.log("product",product)
  setLoading(true)
  const formData = new FormData();

  // Append product details to the FormData
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("category", product.category);
  formData.append("subcategory", product.subcategory);
  formData.append("websiteLink", product?.websiteLink);
  formData.append("youtubeLink", product?.youtubeLink);
  formData.append("rank", product?.rank);
  // Append features as JSON string
  formData.append("features", JSON.stringify(product?.features));

  // Append images and documents (assuming productData.images and productData.documents are File arrays)
  // Append images and documents
  for (let i = 0; i < product?.images.length; i++) {
    formData.append("images", product?.images[i]);
  }

  for (let i = 0; i < product?.documents.length; i++) {
    formData.append("documents", product?.documents[i]);
  }

  console.log("formdata",formData)
  // API call
  createPost(token, formData).then((response) => {
    setProducts(response?.data)
    setLoading(false)
    // Handle success
    toast.success(response?.statusText + "Product")
    navigate('/services')
  }).catch((error) =>{
    setLoading(false)
    console.error("Error creating product:", error);
  })

}


  return (
    <ServiceContext.Provider
      value={{
        loading,
        getAllPosts,
        deleteSinglePost,
        getSinglePost,
        products,
        setProducts,
        addProduct,
        productDetails
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

import React, { useContext, useEffect } from 'react'
import { Add } from '@mui/icons-material';
import { ProductTable } from '../components';
import { AuthContext } from '../context/auth/AuthProvider';
import { PostContext } from "../context/PostProvider"
import { useNavigate } from "react-router-dom"
const Products = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token, } = authContext;
    const postContext = useContext(PostContext);
    const { getAllPosts, products} = postContext
    useEffect(() => {
        !isAuthenticated && navigate("/login")
    }, [isAuthenticated, token])
    useEffect(() => {
        getAllPosts(token)
    }, [products.length])
    return (
        <div className='container mt-5'>
            <div style={{ background: " #ffffff", color: "#525", position: "relative", padding: "5px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>Products</span>
                <button onClick={() => navigate("/add-product")} type="button" class="btn " style={{ borderColor: "#005BAB", display: "flex", gap: "10px", color: "#005BAB", alignItems: "center", justifyContent: "space-between" }}>
                    <Add />
                    Add Product</button>
            </div>
            <ProductTable token={token} />
        </div>
    );
}

export default Products 
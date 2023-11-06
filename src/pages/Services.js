import React, { useContext, useEffect } from 'react'
import { Add } from '@mui/icons-material';
import { ServiceTable } from '../components';
import { AuthContext } from '../context/auth/AuthProvider';
import { ServiceContext } from "../context/ServiceProvider"
import { useNavigate } from "react-router-dom"
const Services = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token, } = authContext;
    const serviceContext = useContext(ServiceContext);
    const { getAllPosts, products} = serviceContext
    useEffect(() => {
        !isAuthenticated && navigate("/login")
    }, [isAuthenticated, token])
    useEffect(() => {
        getAllPosts(token)
    }, [products.length])
    return (
        <div className='container mt-5'>
            <div style={{ background: " #ffffff", color: "#525", position: "relative", padding: "5px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>Services</span>
                <button onClick={() => navigate("/add-service")} type="button" class="btn " style={{ borderColor: "#005BAB", display: "flex", gap: "10px", color: "#005BAB", alignItems: "center", justifyContent: "space-between" }}>
                    <Add />
                    Add Service</button>
            </div>
            <ServiceTable token={token} />
        </div>
    );
}

export default Services 
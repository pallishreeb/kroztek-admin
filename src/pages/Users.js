import React, { useContext, useEffect } from 'react'
// import { List, ListItem, ListItemText } from "@mui/material"
// import { Add } from '@mui/icons-material';
import { UserTable } from '../components';
import { AuthContext } from '../context/auth/AuthProvider';
import { useNavigate } from "react-router-dom"
const Users = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token, getAllUsers, users, setUsers, deleteUser, userloading } = authContext;
    useEffect(() => {
        !isAuthenticated && navigate("/login")
    }, [isAuthenticated, token])
    useEffect(() => {
        if (users.length === 0) {
            getAllUsers(token)
        }
    }, [users.length, token])

    return (
        <div className='container-fluid mt-5'>
            <div style={{ background: " #ffffff", color: "#525", position: "relative", padding: "5px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>Users</span>

            </div>
            <UserTable loading={userloading} users={users} setUsers={setUsers} token={token} deleteUser={deleteUser} />
        </div>
    );
}

export default Users
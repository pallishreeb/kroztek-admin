import React, { useContext, useEffect } from 'react'
import { UserTable } from '../components';
import { AuthContext } from '../context/auth/AuthProvider';
import { useNavigate } from "react-router-dom"
const Users = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token, getAllUsers, users, user, setUsers, deleteUser, userloading } = authContext;
    useEffect(() => {
        !isAuthenticated && navigate("/login")
    }, [isAuthenticated, token])
    useEffect(() => {
        if(JSON.parse(user)?.isAdmin !== true){
             navigate("/")
        }
        if (users.length === 0) {
            getAllUsers(token)
        }
    }, [users.length, token])

    return (
        <div className='container-fluid mt-5'>
            <div style={{ background: " #ffffff", color: "#525", position: "relative", padding: "5px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>Users</span>
                <button onClick={() => navigate("/register")} type="button" class="btn " style={{ borderColor: "#005BAB", display: "flex", gap: "10px", color: "#005BAB", alignItems: "center", justifyContent: "space-between" }}>

                    Register User
                    </button>
            </div>
         
            <UserTable loading={userloading} user={user} users={users} setUsers={setUsers} token={token} deleteUser={deleteUser} />
        </div>
    );
}

export default Users
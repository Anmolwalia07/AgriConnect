import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { userContext } from '../Context/Context';

function FarmerProtectedWrapper({children}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const {user,setUser}=useContext(userContext);
    useEffect(() => {
        if (!token) {
            navigate("/");
            return
        } else {
            async function verifyToken() {
                try {
                    const response = await axios.get("http://localhost:3000/farmer/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if(response){
                        const decoded = jwtDecode(token);
                        const res=await axios.get(`http://localhost:3000/api/farmer/${decoded._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if(res){
                            setUser(res.data.farmer);
                            console.log(res.data.farmer)
                        }
                    }
                }
                catch (err) {
                    console.log(err)
                    navigate("/")
                }
            }
            verifyToken();
        };
    }, [token, navigate])
  return (
    <>
    {children}
    </>
  )
}

export default FarmerProtectedWrapper
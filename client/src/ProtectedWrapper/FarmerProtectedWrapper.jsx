import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function FarmerProtectedWrapper({children}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
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
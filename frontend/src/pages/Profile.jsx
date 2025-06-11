import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth.store.js'

const Profile = () => {
  const navigate=useNavigate()  
  const {user,logout}=useAuthStore()
  const handleLogout=async ()=>{
    await logout()
    navigate("/login")
  }   
  
  return (
    <>
    <div>
        <div>
            <h1>PROFILE</h1>
            {user ? 
            (
                <div>
                    {user.name}
                    {user.email}

                    <button onClick={handleLogout}>
                    LOGOUT
                    </button>
                </div>
            ) 
            : 
            (
                <p>Loading...</p>
            )   
        }
        </div>
    </div>
    </>
  )
}

export default Profile
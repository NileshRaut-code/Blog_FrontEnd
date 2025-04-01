import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const AdminDashboard = () => {

  const user=useSelector(store=>store.user);
  const navigate=useNavigate()
  const [loader ,setloader]=useState(false)
  useEffect(() => {
    console.log();
    
    if (user && user.status && user.data.role === "admin") {
      setloader(true);
    } else {
      navigate("/");
    }
  }, [user, navigate]);



  return  (
    <div className='mt-10 mx-16 min-h-screen'>


    {loader ?<Outlet/> :<>Loadin</>}
    </div>
  )
}

export default AdminDashboard
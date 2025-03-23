import React, { useEffect, useState } from 'react'
import { Alltheusers } from './../../utils/adminutils';

const Allusers = () => {

    const [data,setdata]=useState()
    useEffect(()=>{
        Alltheusers(setdata)
    },[])
    console.log(data);
    
  return (
    <>
    

    <div className="flex flex-col items-center justify-center p-4">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Sr No</th>
                <th className="p-3 text-left text-gray-800 dark:text-gray-200">UserName</th>
                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Role</th>
                <th className="p-3 text-center text-gray-800 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
           {data && data.map((item,index)=>{
            return ( <tr
                key={item._id}
               className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
             >
               <td className="p-3 text-gray-700 dark:text-gray-300">{index + 1}</td>
               <td className="p-3 text-gray-700 dark:text-gray-300">{item.username}</td>
               <td className="p-3 capitalize text-gray-700 dark:text-gray-300">{item.role}</td>
               <td className="p-3 flex justify-center space-x-2"></td>
               </tr>)
           })}
                      </tbody>
                      </table>
                </div>

    </>
  )
}

export default Allusers
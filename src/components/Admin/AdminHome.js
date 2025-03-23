import React from 'react';
import { Link } from 'react-router-dom';

export const AdminHome = () => {
  const data = [
    { title: "All Users", to: "allusers", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4" />
      <path d="M16 3a4 4 0 1 1 0 8" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
    )},
    { title: "Approved", to: "post/state/approved", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    )},
    { title: "Pending", to: "post/state/pending", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )},
    { title: "Rejected", to: "post/state/rejected", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )}
  ];

  return (
    <div className="flex flex-col sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-screen mt-10 ">
      {data.map((item, index) => (
        <Link 
          key={index} 
          to={item.to} 
          className="w-full"
        >
          <div className="border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full text-center flex flex-col items-center gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            {item.icon}
            <span className="text-lg font-medium">{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

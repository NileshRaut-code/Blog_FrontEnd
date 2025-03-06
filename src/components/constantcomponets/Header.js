import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { themechange } from "../../utils/userSlice.js";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.status);
  const theme = useSelector((store) => store.user.theme);
  const darkMode = theme === "dark";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky relative mx-8 md:mx-16 p-3 backdrop-blur-3xl flex justify-between items-center rounded-full shadow-md dark:shadow-lg fixed top-5 left-0 right-0 z-50 max-w-7xl px-6 border border-black/5 dark:border-white/10">
      <div className="flex items-center gap-2">
        <img
          src="https://nileshblog.tech/wp-content/uploads/2023/12/NileshBlog.Tech-Software-Development-Learning-Problem-Solving-Platform.svg"
          alt="DevStudio Logo"
          className="w-32 h-8 dark:invert transition-transform duration-200 transform hover:scale-105"
        />
        <span className="text-black dark:text-white font-semibold text-lg transition-transform duration-200 transform hover:scale-105">
          
        </span>
      </div>
      <div className="hidden md:flex gap-6">
        <Link
          to=""
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
        >
          Home
        </Link>
        {user &&  <Link
          to="/create-post"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
        >
          Add New Post
        </Link>}
        {user &&  <Link
          to="/profile"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
        >
          Profile
        </Link>}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <Link to={'/login'}
              className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
            >
              Login
            </Link>
           
          </>
        ) : (
          <Link to={'/dashboard'}
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
          >
            Dashboard
          </Link>
        )}
        <button
          className="rounded-full px-2 py-2 bg-gray-300 dark:bg-transparent hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
          onClick={() => dispatch(themechange())}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="md:hidden flex ">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 focus:outline-none">
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <button
          className="rounded-full px-2 py-2 bg-gray-300 dark:bg-transparent hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
          onClick={() => dispatch(themechange())}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute bg-[#F5EFFF] dark:bg-[#030712] rounded-3xl top-full left-0 w-full shadow-md py-4 flex flex-col items-center space-y-4 md:hidden">
          <Link
            to=""
            className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
          >
            Home
          </Link>
          {user &&  <Link
          to="/profile"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
        >
          Profile
        </Link>}
          {!user ? (
            <>
              <Link to={'/login'}
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
              >
                Login
              </Link>
             
            </>
          ) : (
            <Link 
              className="bg-black text-white dark:bg.white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

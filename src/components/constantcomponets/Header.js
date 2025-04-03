import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { themechange } from "../../utils/userSlice.js";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((store) => store.user?.data?.role);

  const user = useSelector((store) => store.user.status);
  const theme = useSelector((store) => store.user.theme);
  const darkMode = theme === "dark";
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const closeProfileMenu = () => {
    setIsProfileOpen(false);
  };
    const closeMenu = () => {
    setIsMenuOpen(false);
  };

    useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <nav className="sticky relative mx-4 p-3 md:mx-6 backdrop-blur-3xl flex justify-between items-center rounded-3xl shadow-md dark:shadow-lg fixed top-4 left-0 right-0 z-50 max-w-7xl px-6 border border-black/5 dark:border-white/10">
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
          to="profile"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
        >
          Dashboard
        </Link>}
        {user && role==="admin" &&  <Link
          to="/admin"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
        >
          Admin Dashboard
        </Link>}
      
      </div>
      <div className="hidden md:flex items-center gap-4"  ref={profileRef}>
        {!user ? (
          <>
            <Link to={'/login'}
              className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
            >
              Login
            </Link>
           
          </>
        ) : (
          <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="rounded-full p-2 font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105 "
          >
            <svg
                className="w-8 h-8 rounded-full text-gray-700 dark:text-gray-300  transition-transform duration-200 transform hover:scale-105"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.914A5.005 5.005 0 0010 16a5.005 5.005 0 004.546-2.914A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute bg-[#F5EFFF] dark:bg-[#030712] right-0 mt-2 w-48  rounded-md shadow-lg z-10 border border-black/5 dark:border-white/10 ">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={closeProfileMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  navigate('/logout');
                  closeProfileMenu();
                }}
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
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
             onClick={closeMenu}
          >
            Home
          </Link>
          {user &&  <Link
          to="profile"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
           onClick={closeMenu}
        >
          Dashboard
        </Link>}
        {user && role==="admin" &&  <Link
          to="/admin"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
           onClick={closeMenu}
        >
          Admin Dashboard
        </Link>}
        {user &&  <Link
          to="/create-post"
          className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
           onClick={closeMenu}
        >
          Add New Post
        </Link>}
          {!user ? (
            <>
              <Link to={'/login'}
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105"
                 onClick={closeMenu}
              >
                Login
              </Link>
             
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
            <Link
              to={'/profile'}
              className="rounded-full font-semibold  transition-transform duration-200 transform hover:scale-105 "
              onClick={closeMenu}
            >
              <svg
                  className="w-8 h-8 rounded-full text-gray-700 dark:text-gray-300  transition-transform duration-200 transform hover:scale-105"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.914A5.005 5.005 0 0010 16a5.005 5.005 0 004.546-2.914A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
            </Link>
            <Link
              to={'/logout'}
              className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              onClick={closeMenu}
            >
              Logout
            </Link>

            {/* {isProfileOpen && (
              <div className="absolute bg-[#F5EFFF] dark:bg-[#030712] right-0 mt-2 w-48  rounded-md shadow-lg z-10 border border-black/5 dark:border-white/10 ">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                   //onClick={closeProfileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={()=>{
                    navigate('/logout')
                  }}
                  className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )} */}
          </div>
          
          )}
        </div>
      )}
    </nav>
  );
}
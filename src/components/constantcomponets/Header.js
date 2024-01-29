import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const status = useSelector((store) => store.user.status);
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://www.nileshblog.tech/wp-content/uploads/2023/12/NileshBlog.Tech-Software-Development-Learning-Problem-Solving-Platform.svg"
              className="mr-3 h-6 sm:h-9"
              alt="NileshBlog.Tech Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            {!status ? (
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
            ) : (
              <Link
                to="/logout"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Logout
              </Link>
            )}
            {status && (
              <Link
                to="/dashboard"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                DashBoard
              </Link>
            )}
            {status && (
              <Link
                to="/create-post"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Create New Post
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

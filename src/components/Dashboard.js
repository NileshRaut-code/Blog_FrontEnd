import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const data = useSelector((store) => store.user.data);
  //console.log(data);
  const { avatar, email, fullName, username, createdAt,coverImage } = data;
  return (
    <>
     <section className="relative my-6 mx-16 rounded-lg p-6 border border-opacity-20 border-black/10 dark:border-white/10 ">
      
      <Link
        to={"/edit/profile"}
        className="absolute top-4 right-4 sm:right-8 p-2 bg-gray-800 hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 rounded-full transition-all duration-300"
        title="Edit Profile"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
        </svg>
      </Link>

      {/* User Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-purple-500 shadow-lg transition-transform duration-300 transform group-hover:scale-110"
          />
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></span>
        </div>

        {/* User Details */}
        <div className="text-center sm:text-left">
          <h4 className="text-2xl font-bold  drop-shadow-md">
            {fullName}
          </h4>
          <div className="text-purple-400 dark:text-purple-400 text-lg font-medium">@{username}</div>
          <div className="text-sm text-gray-400">{email}</div>
          <div className="text-sm text-gray-400">
            <span className="font-semibold text-gray-500">Registered On:</span>{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {coverImage && (
        <div className="mt-6 rounded-lg overflow-hidden">
          <img
            src={coverImage}
            alt="Cover Image"
            className="w-full h-48 object-cover rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-purple-500/50"
          />
        </div>
      )}
    </section>
    </>
  );
};

export default Dashboard;

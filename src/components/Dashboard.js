import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { summaryStat } from "../utils/userutils";
import { useState } from "react";
const Dashboard = () => {
  const data = useSelector((store) => store.user.data);
  const [totalViews,settotalViews]=useState(null)
  const [totalpost,settotalpost]=useState(null)

  useEffect(()=>{
    summaryStat(settotalpost,settotalViews)
  },[])
  //console.log(data);
  const { avatar, email, fullName, username, createdAt,coverImage } = data;
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
     <section className="relative  rounded-lg p-6 border border-opacity-20 border-black/10 dark:border-white/10 ">
      
      <Link
        to={"/profile/edit"}
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
    <div className="mt-24 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                     shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.03)]
                     border border-white/20 dark:border-white/5
                     rounded-2xl p-6 transition-all duration-300
                     hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]
                     hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Posts</h3>
            <span className="flex items-center justify-center p-2 bg-purple-500/10 rounded-full">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">{totalpost}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Articles published</p>
        </div>

        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                     shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.03)]
                     border border-white/20 dark:border-white/5
                     rounded-2xl p-6 transition-all duration-300
                     hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]
                     hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Views</h3>
            <span className="flex items-center justify-center p-2 bg-indigo-500/10 rounded-full">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">{totalViews}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total article views</p>
        </div>

        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                     shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.03)]
                     border border-white/20 dark:border-white/5
                     rounded-2xl p-6 transition-all duration-300
                     hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]
                     hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Comments</h3>
            <span className="flex items-center justify-center p-2 bg-blue-500/10 rounded-full">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">85</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">From your readers</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/create-post"
            className="group bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                    border border-white/20 dark:border-white/5
                    rounded-xl p-4 flex items-center gap-3
                    transition-all duration-300 transform hover:-translate-y-1
                    hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]"
          >
            <span className="flex items-center justify-center p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">New Post</span>
          </Link>
          
          <Link 
            to="/profile/edit"
            className="group bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                    border border-white/20 dark:border-white/5
                    rounded-xl p-4 flex items-center gap-3
                    transition-all duration-300 transform hover:-translate-y-1
                    hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]"
          >
            <span className="flex items-center justify-center p-2 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Edit Profile</span>
          </Link>
          
          <Link 
            to={`/author/${username}`}
            className="group bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                    border border-white/20 dark:border-white/5
                    rounded-xl p-4 flex items-center gap-3
                    transition-all duration-300 transform hover:-translate-y-1
                    hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]"
          >
            <span className="flex items-center justify-center p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">My Posts</span>
          </Link>
          
          <Link 
            to="/analytics"
            className="group bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                    border border-white/20 dark:border-white/5
                    rounded-xl p-4 flex items-center gap-3
                    transition-all duration-300 transform hover:-translate-y-1
                    hover:shadow-[0_8px_30px_rgba(120,113,255,0.15)]"
          >
            <span className="flex items-center justify-center p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

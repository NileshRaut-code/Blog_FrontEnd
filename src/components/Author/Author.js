import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Postcart from "../User/Postcart";
import Loading from "../Loader comp/Loading";
import { userProfile } from "../../utils/userutils";

const Author = () => {
  const [userProfiledata, setuserProfiledata] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const [stats, setStats] = useState({
    posts: 0,
    views: 0,
    joined: ''
  });

  useEffect(() => {
    userProfile(username, setuserProfiledata, navigate);
  }, [username, navigate]);

  useEffect(() => {
    if (userProfiledata?.posts) {
      // Calculate stats
      const postCount = userProfiledata.posts.length;
      
      // Sum views from all posts (assuming each post has a views property, otherwise use a placeholder)
      const totalViews = userProfiledata.posts.reduce((total, post) => {
        return total + (post.views || 0);
      }, 0);
      
      // Format joined date (assuming userProfiledata.user.createdAt exists)
      const joinedDate = userProfiledata?.user?.createdAt 
        ? new Date(userProfiledata.user.createdAt).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long'
          })
        : 'Unknown';
      
      setStats({
        posts: postCount,
        views: totalViews,
        joined: joinedDate
      });
    }
  }, [userProfiledata]);

  if (userProfiledata === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-200">User Not Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">The author profile you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return userProfiledata ? (
    <div className="relative min-h-screen">
      {/* Structured data for SEO */}
      {userProfiledata?.user && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": userProfiledata.user.fullName,
            "alternateName": userProfiledata.user.username,
            "image": userProfiledata.user.avatar,
            "url": window.location.href
          })
        }} />
      )}
      
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl transform translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-12">
          {/* Cover Image */}
          <div className="relative h-60 md:h-80 rounded-2xl overflow-hidden mb-12 shadow-xl">
            {userProfiledata?.user?.coverImage ? (
              <img
                src={userProfiledata.user.coverImage}
                alt={`${userProfiledata.user.fullName}'s cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-500/30 to-indigo-600/30"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative -mt-24 md:-mt-20 z-10">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 blur-sm group-hover:blur-md group-hover:opacity-100 transition-all duration-500"></div>
                <img
                  src={userProfiledata?.user?.avatar}
                  alt={userProfiledata?.user?.fullName}
                  className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white/90 dark:border-gray-800/90 
                           shadow-lg transition-transform duration-500 transform group-hover:scale-[1.02] object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {userProfiledata?.user?.fullName}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-600 dark:text-gray-400 text-lg">@{userProfiledata?.user?.username}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Author
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {userProfiledata?.user?.bio || `Writer and contributor with ${stats.posts} articles on various topics.`}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.posts}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Articles</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.views}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Views</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Joined</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stats.joined}</span>
                </div>
              </div>
              
              {/* Contact/Details */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {userProfiledata?.user?.email}
                </div>
                {userProfiledata?.user?.website && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a href={userProfiledata.user.website} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {userProfiledata.user.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Author's Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="h-6 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></span>
            <span>Published Articles</span>
          </h2>
          
          {userProfiledata?.posts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              {userProfiledata.posts.map((post) => (
                <div key={post._id} className="transform hover:-translate-y-2 transition-all duration-300">
                  <Postcart data={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                         rounded-2xl overflow-hidden p-10 text-center
                         shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                         border border-white/20 dark:border-white/5
                         transition-all duration-300 animate-fadeIn">
              <div className="w-24 h-24 mx-auto mb-6 opacity-60">
                <svg className="w-full h-full text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Articles Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                This author hasn't published any articles yet. Check back later!
              </p>
            </div>
          )}
        </div>
        
        {/* Back button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl font-medium
                    bg-white/10 dark:bg-white/5 backdrop-blur-xl
                    border border-white/20 dark:border-white/5
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                    transition-all duration-300
                    hover:shadow-[0_8px_30px_rgba(120,113,255,0.3)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]
                    hover:bg-white/20 dark:hover:bg-white/10
                    text-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Author;

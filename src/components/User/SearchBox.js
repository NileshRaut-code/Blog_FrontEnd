import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if (searchKey.trim().length > 0) {
      navigate(`/search/${searchKey}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`relative transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'}`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full blur-md transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="relative flex items-center bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                       rounded-full overflow-hidden 
                       shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                       border border-white/20 dark:border-white/5
                       transition-all duration-300
                       hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]">
          <div className="flex-grow flex items-center px-4">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchKey}
              placeholder="Search for articles, topics, or keywords..."
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full py-4 px-2 bg-transparent text-gray-800 dark:text-white border-none outline-none placeholder-gray-500 dark:placeholder-gray-400"
            />
            {searchKey && (
              <button 
                onClick={() => setSearchKey('')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium
                     transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <span className="flex items-center">
              <span className="mr-2 my-0.5">Search</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

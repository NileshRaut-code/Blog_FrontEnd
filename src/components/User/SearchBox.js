import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchKey.trim().length > 0) {
      navigate(`/search/${searchKey}`);
    }
  };

  return (
<div className="flex items-center justify-center p-4">
  <div className="flex bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-20 border-dark/10 dark:border-white/10 rounded-lg overflow-hidden shadow-md">
    <input
      type="text"
      value={searchKey}
      placeholder="Search..."
      onChange={(e) => setSearchKey(e.target.value)}
      className="px-4 py-2 w-60 sm:w-72 md:w-96 bg-transparent text-gray-800 dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
    />
    <button
      onClick={handleSearch}
      className={`flex flex-col justify-beween items-center bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-sm border border-blue-400  font-bold py-2 px-6 rounded-lg  transition-all duration-300 hover:ring-2 hover:ring-blue-400`}
    >
      <p>Search</p>
    </button>
  </div>
</div>

  );
};

export default SearchBox;

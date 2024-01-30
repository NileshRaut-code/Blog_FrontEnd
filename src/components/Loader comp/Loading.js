import React from "react";

const Loading = () => {
  return (
    <div className="flex bg-gradient-to-r w-[100%] from-gray-800 via-gray-900 to-black   items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-r-2 border-b-2 border-gray-500"></div>
    </div>
  );
};

export default Loading;

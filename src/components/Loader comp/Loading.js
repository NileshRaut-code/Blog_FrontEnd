import React from "react";

const Loading = () => {
  return (
    <div className="bg-[#F5EFFF] dark:bg-[#030712] flex items-center justify-center w-screen h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-b-2 border-gray-500"></div>
    </div>
  );
};

export default Loading;

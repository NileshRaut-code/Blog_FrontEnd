import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const data = useSelector((store) => store.user.data);
  //console.log(data);
  return (
    <>
      <div className="relative">
        {/* Cover Image */}
        <img
          src={data?.coverImage}
          alt="Cover Image"
          className="w-full h-96 md:h-80 lg:h-96 xl:h-120 object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Avatar and Name Container */}
        <div className="container mx-auto h-full flex items-center justify-start md:justify-center relative z-10">
          {/* Avatar */}
          <div className="md:mr-8">
            <img
              src={data?.avatar}
              alt="Avatar"
              className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full border-4 border-white"
            />
          </div>
          {/* //Owner Name */}
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">
              {data?.fullName}
            </h1>
            <p className="text-lg md:text-xl">{data.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

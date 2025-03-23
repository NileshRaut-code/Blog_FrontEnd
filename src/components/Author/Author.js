import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Postcart from "../User/Postcart";
import Loading from "../Loader comp/Loading";
import { userProfile } from "../../utils/userutils";
const Author = () => {
  const [userProfiledata, setuserProfiledata] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  //console.log(username);

  useEffect(() => {
    userProfile(username, setuserProfiledata, navigate);
  }, [username, navigate]);

  if (userProfiledata === undefined) {
    return (
      <div className="container h-screen w-full mx-auto">
        <h1>No data</h1>
      </div>
    );
  }
  return userProfiledata ? (
    <div>
      <div
        className={`container lg:px-20 md:px-10 sm:px-5 mx-auto `}
      >
        <header className="p-4">
          <div className="flex justify-between items-center">
            <div>
             
            </div>
          </div>
        </header>

        <section className="my-6 mx-6 rounded-lg p-4 border border-opacity-20 border-black/10 dark:border-white/10">
  {/* User Profile Info */}
  <div className="flex items-center gap-6">
    <div className="relative group">
      <img
        src={userProfiledata?.user?.avatar}
        alt="Owner Avatar"
        className="w-20 h-20 rounded-full border-4 border-purple-500 shadow-lg transition-transform duration-300 transform group-hover:scale-110"
      />
      <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></span>
    </div>
    
    <div>
      <h4 className="text-2xl font-bold drop-shadow-md">
        {userProfiledata?.user?.fullName}
      </h4>
      <div className="text-purple-400 text-lg font-medium">@{userProfiledata?.user?.username}</div>
      <div className="text-sm text-gray-400">{userProfiledata?.user?.email}</div>
    </div>
  </div>


  {/* Cover Image */}
  {userProfiledata?.user?.coverImage && (
    <div className="mt-6 rounded-lg overflow-hidden">
      <img
        src={userProfiledata?.user?.coverImage}
        alt="Cover Image"
        className="w-full h-48 object-cover rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-purple-500/50"
      />
    </div>
  )}
</section>

      



        {/* Product listing */}

        <div className="flex-wrap flex-col md:flex-row gap-8  min-h-screen flex items-center justify-center ">
          {/* {allproductdata.data.map((inf) => {
          <Postcart info />;
          // console.log(info);
        })} */}

          {userProfiledata?.posts &&
            userProfiledata?.posts.map((product) => (
              <Postcart key={product.id} data={product} />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Author;

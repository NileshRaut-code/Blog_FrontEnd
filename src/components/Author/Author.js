import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Productcart from "../User/Productcart";
import Loading from "../Loader comp/Loading";
import { userProfile } from "../../utils/userutils";
const Author = () => {
  const [userProfiledata, setuserProfiledata] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  //console.log(username);

  useEffect(() => {
    userProfile(username, setuserProfiledata, navigate);
  }, [username, navigate, userProfiledata]);

  if (userProfiledata === undefined) {
    return (
      <div className="container h-screen w-full bg-gray-700 mx-auto ">
        <h1>No data</h1>
      </div>
    );
  }
  return userProfiledata ? (
    <div className="bg-gray-700">
      <div
        className={`container lg:px-20 md:px-10 sm:px-5 bg-gray-700 mx-auto `}
      >
        <header className="bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-2xl font-bold">
                {userProfiledata?.user?.username}
              </h1>
              <p className="text-gray-300">{userProfiledata?.user?.fullName}</p>
            </div>
          </div>
        </header>

        {/* Shop owner information */}
        <section className="mt-4">
          <div className="flex items-center">
            <img
              src={userProfiledata?.user?.avatar}
              alt="Owner Avatar"
              className="w-12 h-12 rounded-full mr-2"
            />
            <div>
              <h2 className="text-xl font-bold">
                {userProfiledata?.user?.fullName}
              </h2>
              <p>{userProfiledata?.user?.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <image
              src={userProfiledata?.user?.coverImage}
              alt="Cover Image"
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        </section>

        {/* Product listing */}

        <div className="bg-gradient-to-r flex-wrap flex-col md:flex-row from-gray-800 via-gray-900 to-black text-white min-h-screen flex items-center justify-center ">
          {/* {allproductdata.data.map((inf) => {
          <Productcart info />;
          // console.log(info);
        })} */}

          {userProfiledata?.posts &&
            userProfiledata?.posts.map((product) => (
              <Productcart key={product.id} data={product} />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Author;

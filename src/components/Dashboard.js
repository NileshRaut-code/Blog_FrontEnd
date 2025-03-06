import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const data = useSelector((store) => store.user.data);
  console.log(data);
  const { avatar, email, fullName, username, createdAt } = data;
  return (
    <>
      <div className="grid gap-4 px-4 sm:grid-cols-3 py-[20%]">
        <Link
          to={"/edit/profile"}
          className="absolute p-3 right-3 sm:right-28 text-white rounded-lg bg-gray-800 hover:bg-blue-900"
        >
          Edit
        </Link>
        <div className="">
          <img
            alt="avatar wali"
            className="w-32 sm:w-24 mx-auto sm:mt-[5%] rounded-xl"
            src={avatar}
          />
        </div>
        <div className=" ">
          <h2 className="text-2xl">
            <span className="text-gray-500">Name :</span> {fullName}
          </h2>
          <h2 className="text-2xl">
            <span className="text-gray-500">Email :</span>
            {email}
          </h2>
          <h2 className="text-2xl">
            <span className="text-gray-500">UserName :</span> @{username}
          </h2>
          <h2 className="text-2xl">
            <span className="text-gray-500">Registred On :</span>{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

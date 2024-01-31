import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loader comp/Loading";
import { logout } from "../utils/userSlice"; // Import your logout action

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(logout());
  useEffect(() => {
    const REACT_APP_API_URI = process.env.REACT_APP_API_URI;
    const logoutUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          // Handle the case when there is no accessToken
          return;
        }

        const response = await axios.delete(
          `${REACT_APP_API_URI}/api/v1/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        localStorage.removeItem("accessToken");
        console.log("Check if deleted or not", accessToken, response.data);
        dispatch(logout());
        window.location.href = "/";
      } catch (error) {
        localStorage.removeItem("accessToken");

        window.location.href = "/";

        console.error(error);
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <Loading />
    </div>
  );
};

export default Logout;

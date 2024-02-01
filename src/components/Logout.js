import React from "react";
import Loading from "./Loader comp/Loading";
import { useDispatch } from "react-redux";
import { Logoutuser } from "../utils/userutils";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  //const status = useSelector((store) => store.user.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  Logoutuser(dispatch, navigate);

  return (
    <Loading className="bg-gradient-to-r from-gray-800 via-gray-900 to-black" />
  );
};

export default Logout;

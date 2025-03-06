import React from "react";
import Loading from "./Loader comp/Loading";
import { useDispatch } from "react-redux";
import { Logoutuser } from "../utils/userutils";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  Logoutuser(dispatch, navigate);

  return <Loading />;
};

export default Logout;

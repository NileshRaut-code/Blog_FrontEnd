import React from "react";
import Loading from "./Loader comp/Loading";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { Logoutuser } from "../utils/userutils";
const Logout = () => {
  //const status = useSelector((store) => store.user.status);
  const dispatch = useDispatch();

  useEffect(() => {
    Logoutuser(dispatch);
  }, []);

  return <Loading />;
};

export default Logout;

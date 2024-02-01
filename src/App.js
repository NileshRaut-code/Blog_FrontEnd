import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/constantcomponets/Header.js";
import Footer from "./components/constantcomponets/Footer.js";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./components/Loader comp/Loading.js";
import { Currentuser } from "./utils/userutils.js";
// creating this useeffect so that we can easily logged through whole app if we looged and set cookies
//backend set upcookieds

const App = () => {
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user.data);
  useEffect(() => {
    if (userdata == null) {
      console.log("called");
      // aync call so it called first ... no error
      Currentuser(dispatch).then((res) => setloader(res));
    } else {
      console.log("data present not called");
      setloader(true);
    }
  }, [dispatch, navigate, userdata]);

  return loader ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Loading />
  ); //add loader components ... so it check make request to check logged on every page...
};

export default App;

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
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
  const theme = useSelector((store) => store.user.theme);
  useEffect(() => {
    if (userdata == null) {
      //console.log("called");
      // aync call so it called first ... no error
      Currentuser(dispatch).then((res) => setloader(res));
    } else {
      //console.log("data present not called");
      setloader(true);
    }
  }, [dispatch, navigate, userdata]);


  useEffect(()=>{
    document.querySelector('html').classList.remove('dark','light');
    document.querySelector('html').classList.add(theme);
  },[theme])

  return loader ? (
    <div className="bg-[#F5EFFF] dark:bg-[#030712] min-h-[100vh]">
      <ScrollRestoration/>
      <Header />
      <div className="mt-2 md:mt-10 "><Outlet /></div>
      <Footer />
    </div>
  ) : (
    <Loading />
  ); //add loader components ... so it check make request to check logged on every page...
};

export default App;

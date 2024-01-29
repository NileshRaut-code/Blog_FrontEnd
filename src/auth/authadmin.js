import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loader comp/Loading";
function Auth({ children, aut = true }) {
  const authstate = useSelector((store) => store.user.status);
  //console.log("sttus", authstate);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  //intialy loading screen will hapen and then use effect will check auth condition
  //if the route req auth then -> it check if not auhtenticate then login if yes compent need to render
  //if the route not required auth then it automatically render
  useEffect(() => {
    //console.log("sttus of if cond", aut && authstate !== aut);
    if (aut && authstate !== aut) {
      navigate("/login");
    } else if (!aut && authstate !== aut) {
      navigate("/");
    }

    setloader(true);
  }, [authstate, navigate, aut]);

  return loader ? <>{children}</> : <Loading />;
}

export default Auth;

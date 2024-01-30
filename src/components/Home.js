import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./constantcomponets/Header";
import Footer from "./constantcomponets/Footer";
const Home = () => {
  return (
    <>
      <Header />
      this is hom eeeee<Link to={"/dashboard"}>go</Link>
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;

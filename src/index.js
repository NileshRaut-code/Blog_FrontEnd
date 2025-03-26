import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./components/Login.js";
import Home from "./components/User/Home.js";
import { Provider } from "react-redux";
import appstore from "./utils/appstore.js";
import Auth from "./auth/auth.js";
import Logout from "./components/Logout.js";
import Dashboard from "./components/Dashboard.js";

import Createpost from "./components/User/Createpost.js";
import { EditPost } from "./components/User/EditPost.js";
import ViewPost from "./components/User/ViewPost.js";
import Author from "./components/Author/Author.js";
import { Search } from "./components/User/Search.js";
import NotFound from "./components/constantcomponets/NotFound.js";
import { OTP } from "./components/OTP.js";
import AdminDashboard from './components/Admin/AdminDashboard';
import { AdminHome } from "./components/Admin/AdminHome.js";
import PostPub from "./components/Admin/PostPub.js";
import Allusers from "./components/Admin/Allusers.js";
import EditProfile from "./components/User/EditProfile.js";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <Auth aut={false}>
            <Login />
          </Auth>
        ),
      },
      {
        path: "/logout",
        element: (
          <Auth aut={true}>
            <Logout />
          </Auth>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Auth aut={true}>
            <Dashboard />
          </Auth>
        ),
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/create-post",
        element: (
          <Auth aut={true}>
            <Createpost />
          </Auth>
        ),
      },
      {
        path: "/edit/:slug",
        element: (
          <Auth aut={true}>
            <EditPost />
          </Auth>
        ),
      },
      {
        path: "/blog/:slug",
        element: <ViewPost />,
      },
      {
        path: "/profile",
        element: (
          <Auth aut={true}>
            <Dashboard />
          </Auth>
        ),
      },
      {
        path: "/profile/edit",
        element: (
          <Auth aut={true}>
            <EditProfile />
          </Auth>
        ),
      },
      {
        path: "/author/:username",
        element: <Author />,
      },
      {
        path: "/search/:searchkey",
        element: <Search />,
      },
      {
        path: "/verify",
        element: <OTP />,
      },


      {
        path: "/admin",
        element:  <Auth aut={true}><AdminDashboard /></Auth>, // Replace with your admin dashboard component
        children: [
          {
            path: "", 
            element: <AdminHome/>, 
          },
          {
            path: "allusers", 
            element: <Allusers/>, 
          },
          {
            path: "post/state/:state", 
            element: <PostPub/>, 
          },
        ],
      },
      
      {
        path: "*",
        element: <NotFound />,
      },


     
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appstore}>
    <RouterProvider router={routes} />
  </Provider>
);

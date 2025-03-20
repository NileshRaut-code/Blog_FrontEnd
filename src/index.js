import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

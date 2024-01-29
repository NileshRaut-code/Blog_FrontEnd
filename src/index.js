import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.js";
import Home from "./components/User/Home.js";
import { Provider } from "react-redux";
import appstore from "./utils/appstore.js";
import Auth from "./auth/auth.js";
import Logout from "./components/Logout.js";
import Dashboard from "./components/Dashboard.js";

import Editor from "./components/User/Editor.js";
import Createpost from "./components/User/Createpost.js";
import { EditPost } from "./components/User/EditPost.js";
import ViewPost from "./components/User/ViewPost.js";
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
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appstore}>
    <RouterProvider router={routes} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

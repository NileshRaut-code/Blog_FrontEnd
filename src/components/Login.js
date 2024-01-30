import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Loginuser, Signupuser } from "../utils/userutils";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const fullName = useRef(null);

  const [errormsg, seterrmsg] = useState(null);
  const [islogin, setlogin] = useState(true);

  // useEffect(() => {
  //   // Check if there is an alert parameter in the URL
  //   const urlSearchParams = new URLSearchParams(location.search);
  //   const alertMessage = urlSearchParams.get("alert");

  //   // Display the alert message
  //   if (alertMessage) {
  //     alert(alertMessage);
  //   }
  // }, [location.search]);

  function handlelogin() {
    seterrmsg(null);
    Loginuser(dispatch, navigate, seterrmsg, email, password);
  }
  function handlesignin() {
    seterrmsg(null);

    // const body = new FormData();
    // body.append("email", email?.current?.value);
    // body.append("password", password?.current?.value);
    // body.append("username", username?.current?.value);
    // body.append("fullName", fullName?.current?.value);
    const data = {
      fullName: fullName?.current?.value,
      email: email?.current?.value,
      password: password?.current?.value,
      username: username?.current?.value,
    };
    const body = JSON.stringify(data);

    Signupuser(dispatch, navigate, seterrmsg, body);
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-[67vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {islogin ? "Log in" : "Sign up"} to your account
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!islogin && (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div>
                <input
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  ref={fullName}
                  placeholder="email"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div>
              <input
                className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                ref={email}
                placeholder="email"
              />
            </div>
          </div>
          {!islogin && (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                UserName
              </label>
              <div>
                <input
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  ref={username}
                  placeholder="email"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div>
              <input
                className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                ref={password}
                placeholder="password"
              />
            </div>
          </div>
          {errormsg && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errormsg}
            </p>
          )}
          <button
            className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={islogin ? handlelogin : handlesignin}
          >
            {islogin ? "LogIn" : "SignUp"}
          </button>
        </form>
        <p
          className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          onClick={(e) => {
            setlogin(!islogin);
            seterrmsg(null);
          }}
        >
          {!islogin
            ? "If you Already Have Account ? LogIn"
            : "If You Dont Have Account ?SignUp"}
        </p>
      </div>
    </div>
  );
};

export default Login;

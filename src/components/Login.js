import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loginuser, Signupuser } from "../utils/userutils";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneno = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const fullName = useRef(null);
  const [errormsg, seterrmsg] = useState(false);
  const [islogin, setlogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  function handlelogin() {
    seterrmsg(null);
    setLoading(true);
    if (!email.current.value || !password.current.value) {
      seterrmsg("Email and password are required.");
      setLoading(false);
      return;
    }
    Loginuser(dispatch, navigate, seterrmsg, email, password, setLoading);
  }
  function handlesignin() {
    seterrmsg(null);
    setLoading(true);
    // console.log(avatar.current.files[0]);
    if (
      !email.current.value ||
      !password.current.value ||
      !fullName.current.value ||
      !username.current.value ||
      !phoneno.current.value
    ) {
      seterrmsg("All Fields are required.");
      setLoading(false);
      return;
    }

    // Validate phone number (allow only digits)
    const phoneNoValue = phoneno.current.value;
    if (phoneNoValue && !/^\d+$/.test(phoneNoValue)) {
      seterrmsg("Phone number should only contain digits.");
      setLoading(false);
      return;
    }
    const requestBody = {
      email: email?.current?.value,
      password: password?.current?.value,
      username: username?.current?.value,
      fullName: fullName?.current?.value,
      phoneno: phoneno?.current.value,
    };
    const body = JSON.stringify(requestBody);
    console.log(body);
    Signupuser(dispatch, navigate, seterrmsg, body, setLoading);
  }

  return (
    <div className="flex flex-col min-h-[67vh] pb-10 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          {islogin ? "Log in" : "Sign up"} to your account
        </h2>
      </div>
      <div className="mx-auto w-full max-w-sm">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!islogin && (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                Full Name
              </label>
              <div>
                <input
                  className="bg-transparent	 block p-3 w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  ref={fullName}
                  placeholder="Full Name"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-600">
              Email
            </label>
            <div>
              <input
                className="bg-transparent block p-3 w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                ref={email}
                placeholder="Email"
              />
            </div>
          </div>
          {!islogin && (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                UserName
              </label>
              <div>
                <input
                  className="bg-transparent block p-3 w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  ref={username}
                  placeholder="Username"
                />
              </div>
            </div>
          )}
          {!islogin && (
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                Contact No
              </label>
              <div>
                <input
                  className="bg-transparent block p-3 w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  ref={phoneno}
                  placeholder="Contact No"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-600">
              Password
            </label>
            <div>
              <input
                className="bg-transparent block p-3 w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                ref={password}
                placeholder="Password"
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
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : islogin ? (
              "LogIn"
            ) : (
              "SignUp"
            )}
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

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Loginuser,
  Signupuser,
  GoogleLoginuser,
  GoogleSignUser,
} from "../utils/userutils";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const Login = () => {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.user.theme);
  const navigate = useNavigate();
  const phoneno = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const fullName = useRef(null);
  const [errormsg, seterrmsg] = useState(false);
  const [islogin, setlogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [signpassword, setsignPassword] = useState("");
  const [token, settoken] = useState(null);

  const [isLoading, setLoading] = useState(false);

  function handlelogin() {
    seterrmsg(null);
    setLoading(true);
    if (!email.current.value || !password.current.value) {
      seterrmsg("Email and password are required.");
      setLoading(false);
      return;
    }
    // New Gmail validation for login
    if (!/@gmail\.com$/.test(email.current.value)) {
      seterrmsg("Email must be a valid Gmail email.");
      setLoading(false);
      return;
    }
    Loginuser(dispatch, navigate, seterrmsg, email, password, setLoading);
  }
  function handlesignin() {
    seterrmsg(null);
    setLoading(true);
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
    if (!/@gmail\.com$/.test(email.current.value)) {
      seterrmsg("Email must be a valid Gmail email.");
      setLoading(false);
      return;
    }
    const pwd = password.current.value;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        pwd
      )
    ) {
      seterrmsg(
        "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character."
      );
      setLoading(false);
      return;
    }
    const phoneNoValue = phoneno.current.value;
    if (phoneNoValue && !/^\d+$/.test(phoneNoValue)) {
      seterrmsg("Phone number should only contain digits.");
      setLoading(false);
      return;
    }
    const requestBody = {
      email: email?.current?.value,
      password: pwd,
      username: username?.current?.value,
      fullName: fullName?.current?.value,
      phoneno: phoneno?.current.value,
    };
    const body = JSON.stringify(requestBody);
    console.log(body);
    Signupuser(dispatch, navigate, seterrmsg, body, setLoading);
  }

  const handleGoogleLoginSuccess = (credentialResponse) => {
    GoogleLoginuser(
      dispatch,
      navigate,
      seterrmsg,
      setLoading,
      credentialResponse
    );
  };

  const handlegoogleSignup = async () => {
    seterrmsg(true);
    setIsOpen(true);
    if (!token) {
      seterrmsg("Some Error for Google Loggin");
    }
    GoogleSignUser(
      { token, password: signpassword },
      dispatch,
      navigate,
      setLoading,
      seterrmsg
    );
  };
  return (
    <div>
      {islogin ? (
        <div className="flex flex-col items-center justify-center max-h-screen mt-10">
          <h3 className="text-2xl font-bold mb-4">Login</h3>
          <form
            className="border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              handlelogin();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                ref={email}
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                ref={password}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {errormsg && (
              <p className="text-red-600 dark:text-red-600 text-sm my-2">
                {errormsg}
              </p>
            )}
            <button
              onClick={handlelogin}
              className="cursor-pointer flex w-full justify-center rounded-md bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-sm border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Login"
              )}
            </button>
            <div className="mt-4 ">
              <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
               
                <GoogleLogin
                  theme={theme === "dark" ? "filled_black" : "outline"}
                  shape="pill"
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => seterrmsg("Google authentication error")}
                />
              </GoogleOAuthProvider>
            </div>
          </form>

          <p
            className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mt-4"
            onClick={() => {
              setlogin(!islogin);
              seterrmsg(null);
            }}
          >
            If you don't have an account? Sign Up
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center max-h-screen mt-10">
          <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
          <form
            className="border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              handlesignin();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                ref={fullName}
                placeholder="Full Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="email-signup"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                ref={email}
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={username}
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="contact">
                Contact No
              </label>
              <input
                id="contact"
                type="text"
                ref={phoneno}
                placeholder="Contact No"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password-signup"
              >
                Password
              </label>
              <input
                id="password-signup"
                type="password"
                ref={password}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            {errormsg && (
              <p className="text-red-600 dark:text-red-600 text-sm my-2">
                {errormsg}
              </p>
            )}
            <button
              onClick={handlesignin}
              className="cursor-pointer mb-4 flex w-full justify-center rounded-md bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-sm border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Sign Up"
              )}
            </button>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <GoogleLogin
              theme={theme === "dark" ? "filled_black" : "outline"}
              shape="pill"
              onSuccess={(credentialResponse) => {
                settoken(credentialResponse.credential);
                setIsOpen(true);
              }}
            />
          </GoogleOAuthProvider>
          </form>
         
          <p
            className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mt-4"
            onClick={() => {
              setlogin(!islogin);
              seterrmsg(null);
            }}
          >
            If you already have an account? Log In
          </p>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#f5efffe9] dark:bg-[#030712cb]  bg-opacity-70">
              <div className="bg-[#F5EFFF] dark:bg-[#030712] p-6 rounded-lg shadow-lg w-96">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold">
                      Enter New Password To Complete Registration
                    </label>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <input
                    type="password"
                    id="password"
                    value={signpassword}
                    onChange={(e) => setsignPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {errormsg && (
                  <p className="text-red-500 text-sm mt-2">{errormsg}</p>
                )}

                <div className="mt-4 ">
                  <button
                    onClick={handlegoogleSignup}
                    className={`w-full flex flex-col justify-beween items-center bg-white dark:bg-opacity-10  bg-opacity-20 backdrop-blur-sm border border-purple-400  font-bold py-2 px-6 rounded-lg shadow transition-all duration-300 focus:outline-none focus:shadow-outline hover:ring-2 hover:ring-purple-400`}
                  >
                    <span className="relative z-10">Signup</span>
                    <span
                      className={`rounded-md absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 transform ${
                        isLoading ? "scale-x-100" : "scale-x-0"
                      } transition-transform duration-[6s] origin-left`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;

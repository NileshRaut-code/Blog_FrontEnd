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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl 
                    bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                    border border-white/20 dark:border-white/5
                    p-8 transition-all duration-300">
      {islogin ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Login
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Enter your credentials to access your account
                </p>
              </div>
              
          <form
                className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handlelogin();
            }}
          >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                Email
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
              <input
                id="email"
                type="email"
                ref={email}
                placeholder="Email"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
            </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                Password
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
              <input
                id="password"
                type="password"
                ref={password}
                placeholder="Password"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
            </div>
                  </div>
                </div>

            {errormsg && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                {errormsg}
                  </div>
            )}

            <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 
                          bg-gradient-to-r from-purple-600 to-indigo-600 
                          hover:from-purple-700 hover:to-indigo-700
                          text-white rounded-lg font-medium
                          shadow-lg shadow-purple-500/20 dark:shadow-indigo-500/30
                          transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                          overflow-hidden"
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
              {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
              ) : (
                    "Sign in"
              )}
            </button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#F5EFFF] dark:bg-[#030712] text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
              <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <GoogleLogin
                  theme={theme === "dark" ? "filled_black" : "outline"}
                  shape="pill"
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => seterrmsg("Google authentication error")}
                />
              </GoogleOAuthProvider>
            </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Join our community today
          </p>
        </div>
              
          <form
                className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handlesignin();
            }}
          >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="fullname">
                Full Name
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
              <input
                id="fullname"
                type="text"
                ref={fullName}
                placeholder="Full Name"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
            </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email-signup">
                Email
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
              <input
                        id="email-signup"
                type="email"
                ref={email}
                placeholder="Email"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
            </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">
                Username
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.914A5.005 5.005 0 0010 16a5.005 5.005 0 004.546-2.914A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                      </div>
              <input
                id="username"
                type="text"
                ref={username}
                placeholder="Username"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
            </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="contact">
                      Phone Number
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
              <input
                id="contact"
                type="text"
                ref={phoneno}
                        placeholder="Phone Number"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
            </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password-signup">
                Password
              </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
              <input
                id="password-signup"
                type="password"
                ref={password}
                placeholder="Password"
                        className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                                shadow-sm ring-1 ring-inset ring-white/10 
                                focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                                transition-all duration-300"
              />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Must contain 8+ characters with uppercase, lowercase, number & special character
                    </p>
                  </div>
            </div>
            
            {errormsg && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                {errormsg}
                  </div>
            )}

            <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 
                          bg-gradient-to-r from-purple-600 to-indigo-600 
                          hover:from-purple-700 hover:to-indigo-700
                          text-white rounded-lg font-medium
                          shadow-lg shadow-purple-500/20 dark:shadow-indigo-500/30
                          transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                          overflow-hidden"
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
              {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
              ) : (
                    "Create Account"
              )}
            </button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#F5EFFF] dark:bg-[#030712] text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <GoogleLogin
              theme={theme === "dark" ? "filled_black" : "outline"}
              shape="pill"
              onSuccess={(credentialResponse) => {
                settoken(credentialResponse.credential);
                setIsOpen(true);
              }}
                      onError={() => seterrmsg("Google authentication error")}
            />
          </GoogleOAuthProvider>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={() => {
              setlogin(!islogin);
              seterrmsg(null);
            }}
          >
            {islogin ? (
              <span>Don't have an account? <span className="font-semibold text-purple-600 dark:text-indigo-400">Sign up</span></span>
            ) : (
              <span>Already have an account? <span className="font-semibold text-purple-600 dark:text-indigo-400">Sign in</span></span>
            )}
          </button>
        </div>

        {/* Modal for Google Signup Password */}
          {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
              <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"></div>
              
              <div className="relative inline-block bg-white/90 dark:bg-black/90 backdrop-blur-xl
                           rounded-2xl overflow-hidden shadow-xl transform transition-all
                           max-w-md w-full p-6 border border-white/20 dark:border-white/5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Complete Registration
                  </h3>
                    <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Create a password for your account
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  <input
                    type="password"
                      id="google-password"
                    value={signpassword}
                    onChange={(e) => setsignPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full rounded-lg border-0 bg-white/5 p-3 pl-10 text-gray-800 dark:text-white 
                               shadow-sm ring-1 ring-inset ring-white/10 
                               focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:focus:ring-indigo-500
                               transition-all duration-300"
                    />
                  </div>
                </div>
                
                {errormsg && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4">
                    {errormsg}
                  </div>
                )}

                  <button
                  type="button"
                    onClick={handlegoogleSignup}
                  className="group relative w-full flex justify-center py-3 px-4 
                           bg-gradient-to-r from-purple-600 to-indigo-600 
                           hover:from-purple-700 hover:to-indigo-700
                           text-white rounded-lg font-medium
                           shadow-lg shadow-purple-500/20 dark:shadow-indigo-500/30
                           transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                           overflow-hidden"
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Complete Signup"
                  )}
                  </button>
              </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Login;

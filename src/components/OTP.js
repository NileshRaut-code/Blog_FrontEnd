import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyUser } from "../utils/userutils";

export const OTP = () => {
  const user = useSelector((store) => store.user.status);
  const isVerified = useSelector((store) => store.user.data.isVerified);
  const [isLoading, setLoading] = useState(false);
  const [errormsg, seterrmsg] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(isVerified);
    if (!user) {
      navigate("/login");
    } else if (isVerified === true) {
      navigate("/");
    }
  }, []);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(180);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isResendDisabled]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = parseInt(otp.join(""), 10);
    setLoading(true);
    if (!isVerified) {
      verifyUser(dispatch, navigate, otpCode, seterrmsg);
    }
    setLoading(false);
  };

  const handleResend = () => {
    setIsResendDisabled(true);

    resendOtp(seterrmsg);

    setTimer(90);
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <div className="flex flex-col gap-4 border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full max-w-sm">
        <div className="space-x-4 flex justify-center ">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border rounded-md text-lg"
            />
          ))}
        </div>
        {errormsg && (
          <p className="text-red-600 dark:text-red-600 text-sm my-2">
            {errormsg}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="cursor-pointer flex w-full justify-center rounded-md bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-sm border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Verify OTP"
          )}
        </button>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`            className="cursor-pointer flex w-full justify-center rounded-md bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-sm border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 ${
   isResendDisabled
     ? "bg-gray-400 cursor-not-allowed"
     : "bg-green-500 text-white"
 }`}
        >
          {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

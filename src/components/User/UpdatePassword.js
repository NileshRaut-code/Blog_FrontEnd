import React, { useRef, useState } from 'react';
import { changedPassword } from '../../utils/userutils';

const UpdatePassword = () => {
    const oldPassword = useRef(null);
    const newPassword = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    function handleUpdatePassword(e) {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(true);
        
        if (!oldPassword.current.value || !newPassword.current.value) {
            setErrorMsg("Both fields are required.");
            setLoading(false);
            return;
        }
        
        const newPwd = newPassword.current.value;
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPwd)) {
            setErrorMsg("New password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.");
            setLoading(false);
            return;
        }
        
        const body = {
            oldPassword: oldPassword.current.value,
            newPassword: newPwd
        };
        
        changedPassword(
            (msg) => {
                if (msg.includes("successfully")) {
                    setSuccessMsg(msg);
                    oldPassword.current.value = "";
                    newPassword.current.value = "";
                } else {
                    setErrorMsg(msg);
                }
            },
            body,
            setLoading
        );
    }

    return (
        <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl transform translate-y-1/2 animate-pulse-slow"></div>
            </div>
            
            {/* Main content */}
            <div className="relative z-10 max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                        Update Password
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Strengthen your account security with a new password
                    </p>
                </div>
                
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                               rounded-2xl overflow-hidden
                               shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                               border border-white/20 dark:border-white/5
                               transition-all duration-300
                               hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]
                               animate-fadeIn">
                    <form
                        className="p-6 sm:p-8"
                        onSubmit={handleUpdatePassword}
                    >
                        {/* Password icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Old Password Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="oldPassword">
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    ref={oldPassword}
                                    placeholder="Enter your current password"
                                    className="block w-full pl-10 pr-3 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-md
                                             border border-gray-300/50 dark:border-gray-700/50 rounded-xl
                                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                                             transition-all duration-300
                                             text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-600"
                                />
                            </div>
                        </div>
                        
                        {/* New Password Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="newPassword">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="newPassword"
                                    type="password"
                                    ref={newPassword}
                                    placeholder="Create a strong password"
                                    className="block w-full pl-10 pr-3 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-md
                                             border border-gray-300/50 dark:border-gray-700/50 rounded-xl
                                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                                             transition-all duration-300
                                             text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-600"
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                            </p>
                        </div>
                        
                        {/* Error Message */}
                        {errorMsg && (
                            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-fadeIn">
                                {errorMsg}
                            </div>
                        )}
                        
                        {/* Success Message */}
                        {successMsg && (
                            <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm animate-fadeIn">
                                {successMsg}
                            </div>
                        )}
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full px-6 py-3 rounded-xl font-medium
                                     bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                                     shadow-lg shadow-purple-500/20 dark:shadow-indigo-500/30
                                     transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                                     hover:shadow-purple-500/30 dark:hover:shadow-indigo-500/40
                                     disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <span className={`flex justify-center items-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Update Password
                            </span>
                            
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                        </button>
                    </form>
                </div>
                
                {/* Password Tips */}
                <div className="mt-8 p-5 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/5">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Password Security Tips</h3>
                    <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Use a unique password for each of your accounts
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Avoid using easily guessable information
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Consider using a password manager
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
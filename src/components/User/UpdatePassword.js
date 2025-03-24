import React, { useRef, useState } from 'react';
import { changedPassword } from '../../utils/userutils';

const UpdatePassword = () => {
    const oldPassword = useRef(null);
    const newPassword = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setLoading] = useState(false);

    function handleUpdatePassword(e) {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        if (!oldPassword.current.value || !newPassword.current.value) {
            setErrorMsg("Both fields are required.");
            setLoading(false);
            return;
        }
        const newPwd = newPassword.current.value;
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPwd)) {
            setErrorMsg("New Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.");
            setLoading(false);
            return;
        }
        const body={oldPassword:oldPassword.current.value,newPassword:newPwd}
        // ...existing code for API call...
        changedPassword(setErrorMsg,body,setLoading)
        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h3 className="text-2xl font-bold mb-4">Update Password</h3>
            <form
                className="border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full max-w-sm"
                onSubmit={handleUpdatePassword}
            >
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="oldPassword">
                        Old Password
                    </label>
                    <input
                        id="oldPassword"
                        type="password"
                        ref={oldPassword}
                        placeholder="Old Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        ref={newPassword}
                        placeholder="New Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {errorMsg && (
                    <p className="text-red-600 dark:text-red-600 text-sm my-2">
                        {errorMsg}
                    </p>
                )}
                <button
                    type="submit"
                    className="cursor-pointer flex w-full justify-center rounded-md bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-sm border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                        "Update"
                    )}
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
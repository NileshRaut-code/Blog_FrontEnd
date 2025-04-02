import React, { useEffect, useState } from 'react';
import { Alltheusers } from './../../utils/adminutils';
import Loading from '../Loader comp/Loading';

const Allusers = () => {
  const [data, setdata] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await Alltheusers(setdata);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          User Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all registered users on your platform
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                      rounded-2xl overflow-hidden 
                      shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                      border border-white/20 dark:border-white/5
                      p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No Users Found</h3>
          <p className="text-gray-500 dark:text-gray-400">There are no users registered in the system yet.</p>
        </div>
      ) : (
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                     rounded-2xl overflow-hidden 
                     shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                     border border-white/20 dark:border-white/5">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200/30 dark:border-gray-700/30">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <span className="h-5 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></span>
                      <span className="text-gray-700 dark:text-gray-200 font-semibold">ID</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <span className="h-5 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></span>
                      <span className="text-gray-700 dark:text-gray-200 font-semibold">Username</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <span className="h-5 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></span>
                      <span className="text-gray-700 dark:text-gray-200 font-semibold">Role</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-gray-700 dark:text-gray-200 font-semibold">Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                {data.map((item, index) => (
                  <tr
                    key={item._id}
                    className="transition-colors hover:bg-white/5 dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono bg-blue-100/20 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md px-2 py-1 text-xs">
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {item.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{item.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                     ${item.role === 'admin' 
                                       ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                                       : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                     }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${item.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'} mr-2`}></span>
                        <span className="capitalize">{item.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="px-2 py-1 rounded-lg bg-white/10 dark:bg-white/5 border border-white/10 dark:border-white/5
                                  text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400
                                  transition-colors duration-200 group"
                          title="View user details"
                        >
                          <svg className="w-5 h-5 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allusers;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { PostState, PostStateChanged } from '../../utils/adminutils';
import Loading from '../Loader comp/Loading';
import PostModal from './PostModel';

const PostPub = () => {
  const { state } = useParams();
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [data, setdata] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const stateOptions = ["approved", "rejected", "pending"];
  const [searchParam, setSearchParams] = useSearchParams();
  const page = parseInt(searchParam.get("page")) || 1;
  const limit = parseInt(searchParam.get("limit")) || 10;
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  useEffect(() => {
    if (!stateOptions.includes(state)) {
      navigate("/404");
    }
    PostState(state, setdata, setloader, page, limit).then(() => {
      // if (data && data.length < limit) {
      //   setIsNextButtonDisabled(true);
      // } else {
      //   setIsNextButtonDisabled(false);
      // }
    });
  }, [state, navigate, page, limit]);

  const handleStateChange = ({ s, _id }) => {
    if (s && _id) {
      PostStateChanged(s, _id);
    }
    return;
  };

  const handleViewClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit: limit });
  };

  // Get color scheme based on state
  const getStateColorScheme = (postState) => {
    switch(postState) {
      case 'approved':
        return {
          bg: 'bg-emerald-100 dark:bg-emerald-900/30',
          text: 'text-emerald-800 dark:text-emerald-300',
          dot: 'bg-emerald-600',
          gradient: 'from-emerald-600 to-green-600'
        };
      case 'pending':
        return {
          bg: 'bg-amber-100 dark:bg-amber-900/30',
          text: 'text-amber-800 dark:text-amber-300',
          dot: 'bg-amber-600',
          gradient: 'from-amber-600 to-yellow-600'
        };
      case 'rejected':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-800 dark:text-red-300',
          dot: 'bg-red-600',
          gradient: 'from-red-600 to-rose-600'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          text: 'text-gray-800 dark:text-gray-300',
          dot: 'bg-gray-600',
          gradient: 'from-gray-600 to-gray-700'
        };
    }
  };

  // Get button styling for actions
  const getButtonStyle = (actionType) => {
    switch(actionType) {
      case 'approved':
        return 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/30';
      case 'pending':
        return 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/30';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30';
      case 'view':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700';
    }
  };

  // Title based on state
  const getStateTitle = () => {
    switch(state) {
      case 'approved':
        return 'Approved Posts';
      case 'pending':
        return 'Pending Posts';
      case 'rejected':
        return 'Rejected Posts';
      default:
        return 'Posts';
    }
  };

  return (
    <>
      <div className="animate-fadeIn">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${state === 'approved' ? 'from-emerald-600 to-green-600' : state === 'pending' ? 'from-amber-600 to-yellow-600' : 'from-red-600 to-rose-600'}`}>
            {getStateTitle()}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {state === 'approved' 
              ? 'View and manage posts that have been approved.' 
              : state === 'pending' 
                ? 'Review posts waiting for approval.' 
                : 'View posts that have been rejected.'}
          </p>
        </div>

        {!loader ? (
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No Posts Found</h3>
            <p className="text-gray-500 dark:text-gray-400">There are no {state} posts to display.</p>
          </div>
        ) : (
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                        rounded-2xl overflow-hidden 
                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                        border border-white/20 dark:border-white/5
                        mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200/30 dark:border-gray-700/30">
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center">
                        <span className={`h-5 w-1 bg-gradient-to-b ${state === 'approved' ? 'from-emerald-600 to-green-600' : state === 'pending' ? 'from-amber-600 to-yellow-600' : 'from-red-600 to-rose-600'} rounded-full mr-3`}></span>
                        <span className="text-gray-700 dark:text-gray-200 font-semibold">ID</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center">
                        <span className={`h-5 w-1 bg-gradient-to-b ${state === 'approved' ? 'from-emerald-600 to-green-600' : state === 'pending' ? 'from-amber-600 to-yellow-600' : 'from-red-600 to-rose-600'} rounded-full mr-3`}></span>
                        <span className="text-gray-700 dark:text-gray-200 font-semibold">Title</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center">
                        <span className={`h-5 w-1 bg-gradient-to-b ${state === 'approved' ? 'from-emerald-600 to-green-600' : state === 'pending' ? 'from-amber-600 to-yellow-600' : 'from-red-600 to-rose-600'} rounded-full mr-3`}></span>
                        <span className="text-gray-700 dark:text-gray-200 font-semibold">Status</span>
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
                  {data.map((item, index) => {
                    const colorScheme = getStateColorScheme(item.state);
                    const availableStates = stateOptions.filter((s) => s !== item.state);

                    return (
                      <tr
                        key={item._id}
                        className="transition-colors hover:bg-white/5 dark:hover:bg-white/5"
                      >
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono bg-gray-100/20 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 rounded-md px-2 py-1 text-xs">
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                            {item.title}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorScheme.bg} ${colorScheme.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${colorScheme.dot} mr-2`}></span>
                            <span className="capitalize">{item.state}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <button
                              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 shadow-sm ${getButtonStyle('view')}`}
                              onClick={() => handleViewClick(item)}
                            >
                              <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>View</span>
                              </div>
                            </button>
                            {availableStates.map((s) => (
                              <button
                                key={s}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 shadow-sm ${getButtonStyle(s)}`}
                                onClick={() => handleStateChange({ s: s, _id: item._id })}
                              >
                                <div className="flex items-center space-x-1">
                                  {s === 'approved' && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                  {s === 'pending' && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )}
                                  {s === 'rejected' && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  )}
                                  <span className="capitalize">{s}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {loader && data && data.length > 0 && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl font-medium flex items-center space-x-2
                        bg-white/10 dark:bg-white/5 backdrop-blur-md
                        border border-white/20 dark:border-white/5
                        shadow-sm transition-all duration-200
                        hover:shadow-md hover:bg-white/20 dark:hover:bg-white/10
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 dark:disabled:hover:bg-white/5
                        text-gray-700 dark:text-gray-300"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!data || data.length < limit}
              className="px-5 py-2.5 rounded-xl font-medium flex items-center space-x-2
                        bg-white/10 dark:bg-white/5 backdrop-blur-md
                        border border-white/20 dark:border-white/5
                        shadow-sm transition-all duration-200
                        hover:shadow-md hover:bg-white/20 dark:hover:bg-white/10
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 dark:disabled:hover:bg-white/5
                        text-gray-700 dark:text-gray-300"
            >
              <span>Next</span>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </>
  );
};

export default PostPub;
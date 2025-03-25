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
  const [searchParam, setSearchParams] = useSearchParams(); // Use setSearchParams
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
    setSearchParams({ page: newPage, limit: limit }); // Update page in URL
  };

  return (
    <>
      {loader ? (
        <div className="flex flex-col items-center justify-center p-4">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Sr No</th>
                <th className="p-3 text-left text-gray-800 dark:text-gray-200">Title</th>
                <th className="p-3 text-left text-gray-800 dark:text-gray-200">State</th>
                <th className="p-3 text-center text-gray-800 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  const availableStates = stateOptions.filter((s) => s !== item.state);

                  return (
                    <tr
                      key={item._id}
                      className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                    >
                      <td className="p-3 text-gray-700 dark:text-gray-300">{index + 1}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{item.title}</td>
                      <td className="p-3 capitalize text-gray-700 dark:text-gray-300">{item.state}</td>
                      <td className="p-3 flex justify-center space-x-2">
                        <button
                          className="px-4 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                          onClick={() => handleViewClick(item)}
                        >
                          View
                        </button>
                        {availableStates.map((s) => (
                          <button
                            key={s}
                            className="px-4 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md transition"
                            onClick={() => handleStateChange({ s: s, _id: item._id })}
                          >
                            {s}
                          </button>
                        ))}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!data || data.length < limit}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </>
  );
};

export default PostPub;
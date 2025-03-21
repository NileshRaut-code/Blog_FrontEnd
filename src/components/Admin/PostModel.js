// filepath: src/components/Admin/PostModal.js
import React from 'react';
import DOMPurify from 'dompurify';

const PostModal = ({ post, onClose }) => {
  if (!post) {
    return null;
  }

  const sanitizedDescription = DOMPurify.sanitize(post.description);

  return (
    <div className="fixed top-14 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 w-3/4 md:w-1/2 max-h-[85vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{post.title}</h2>
        <div
          className="text-gray-700 dark:text-gray-300 mb-4"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
        {/* Add other post details here */}
      </div>
    </div>
  );
};

export default PostModal;
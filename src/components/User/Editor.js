import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost, updatePost } from "../../utils/userutils";

const Editor = (postdata) => {
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const title = useRef(null);
  const slug = useRef(null);
  const description = useRef(null);
  const [err, seterr] = useState("");
  const pId = postdata.data.pId;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (postdata) {
      title.current.value = postdata.data.title || "";
      slug.current.value = postdata.data.slug || "";
      setSelectedImage(postdata?.data?.image || "");
      // For ReactQuill, use its API to set content
      if (description.current) {
        description.current.getEditor().root.innerHTML =
          postdata.data.description || "";
      }
    }
  }, [postdata]);
  
  const handleImageChange = (e) => {
    const file = e.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleUpdate() {
    if (
      !title.current.value ||
      !slug.current.value ||
      !description.current.value
    ) {
      seterr("All fields are required to create post");
      return;
    }

    setIsSubmitting(true);

    if (postdata.data.new === true) {
      const body = new FormData();
      body.append("title", title?.current?.value);
      body.append("slug", slug?.current?.value);
      body.append("description", description?.current?.value);
      if (imageInput) {
        body.append("image", imageInput?.current?.files[0]);
      }
      addPost(body, seterr, navigate)
    }
    if (postdata.data.new === false) {
      const body = new FormData();
      title.current.value && body.append("title", title?.current?.value);

      description.current.value &&
        body.append("description", description?.current?.value);
      if (imageInput.current.files) {
        body.append("image", imageInput?.current?.files[0]);
      }

      updatePost(pId, body, seterr, navigate)
    }
  }
  
  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsSubmitting(true);
      deletePost(pId, seterr, navigate).finally(() => setIsSubmitting(false));
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const newSlug = generateSlug(newTitle);
    slug.current.value = newSlug;
  };

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl transform translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-gradient-slow bg-gradient-size">
            {postdata.data.new ? "Create New Post" : "Edit Post"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share your thoughts and ideas with our community
          </p>
        </div>
        
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                       rounded-2xl overflow-hidden 
                       shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                       border border-white/20 dark:border-white/5
                       transition-all duration-300
                       hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]
                       animate-fadeIn">
          <form onSubmit={(e) => e.preventDefault()} className="p-6 lg:p-8">
            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <div className="rounded-xl overflow-hidden border border-white/20 dark:border-white/10 shadow-lg">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* Image Upload */}
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Featured Image
              </label>
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 focus-within:outline-none"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image"
                        type="file"
                        ref={imageInput}
                        onChange={handleImageChange}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                ref={title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2.5 rounded-xl text-gray-800 dark:text-gray-200
                         bg-white/50 dark:bg-black/50 backdrop-blur-md
                         border border-gray-300/50 dark:border-gray-700/50
                         focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                         transition-all duration-300"
                placeholder="Enter post title..."
              />
            </div>
            
            {/* Slug Input */}
            <div className="mb-6">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Slug
              </label>
              <input
                id="slug"
                type="text"
                ref={slug}
                className="w-full px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-400
                         bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md
                         border border-gray-300/50 dark:border-gray-700/50
                         transition-all duration-300"
                readOnly
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                URL-friendly version of the title. This is auto-generated.
              </p>
            </div>
            
            {/* Content Editor */}
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Content
              </label>
              <div className="ql-snow-wrapper rounded-xl overflow-hidden border border-gray-300/50 dark:border-gray-700/50">
                <ReactQuill
                  id="content"
                  ref={description}
                  className="bg-white dark:bg-gray-900 rounded-xl"
                  theme="snow"
                  placeholder="Write your content here..."
                />
              </div>
            </div>
            
            {/* Error Message */}
            {err && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {err}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="relative px-6 py-2.5 rounded-xl font-medium
                         bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                         shadow-lg shadow-purple-500/20 dark:shadow-indigo-500/30
                         transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                         hover:shadow-purple-500/30 dark:hover:shadow-indigo-500/40
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className={`flex items-center gap-2 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>{postdata.data.new ? "Publish Post" : "Update Post"}</span>
                </span>
                
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </button>
              
              {!postdata.data.new && (
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl font-medium
                           bg-white/10 dark:bg-white/5 backdrop-blur-xl text-red-600 dark:text-red-400
                           border border-red-500/20 dark:border-red-500/10
                           shadow-lg shadow-red-500/5
                           transition-all duration-300 transform hover:-translate-y-1
                           hover:bg-red-50 dark:hover:bg-red-950/10
                           disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete Post</span>
                  </span>
                </button>
              )}
              
              <button
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl font-medium
                         bg-white/10 dark:bg-white/5 backdrop-blur-xl
                         border border-gray-300/50 dark:border-gray-700/50
                         shadow-lg
                         transition-all duration-300 transform hover:-translate-y-1
                         hover:bg-white/20 dark:hover:bg-white/10
                         text-gray-700 dark:text-gray-300
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Cancel</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editor;

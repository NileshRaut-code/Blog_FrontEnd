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
      seterr("All filed are required to create post");
      return;
    }

    if (postdata.data.new === true) {
      //console.log("new Post");
      const body = new FormData();
      body.append("title", title?.current?.value);
      body.append("slug", slug?.current?.value);
      body.append("description", description?.current?.value);
      if (imageInput) {
        body.append("image", imageInput?.current?.files[0]);
        console.log(imageInput?.current?.files[0]);
      }
      addPost(body, seterr, navigate);
    }
    if (postdata.data.new === false) {
      console.log("update");
      const body = new FormData();
      title.current.value && body.append("title", title?.current?.value);

      description.current.value &&
        body.append("description", description?.current?.value);
      if (imageInput.current.files) {
        body.append("image", imageInput?.current?.files[0]);
        console.log(imageInput?.current?.files[0]);
      }

      updatePost(pId, body, seterr, navigate);
    }
  }
  function handleDelete() {
    deletePost(pId, seterr, navigate);
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
    <div className=" bg-gradient-to-r from-gray-800 via-gray-900 to-black  min-h-screen mx-auto p-4">
      <div className="md:w-1/2 mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          {selectedImage && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">
                Selected Image:
              </label>
              <img
                src={selectedImage}
                alt="Selected"
                className="mt-1 p-2 border rounded-md bg-slate-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Image:
            </label>
            <input
              id="image"
              type="file"
              ref={imageInput}
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md bg-slate-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              ref={title}
              onChange={handleTitleChange}
              className="mt-1 p-2 w-full border rounded-md bg-slate-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-white"
            >
              Slug:
            </label>
            <input
              id="slug"
              type="text"
              ref={slug}
              className="mt-1 p-2 w-full border rounded-md bg-slate-400"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-white"
            >
              Content:
            </label>
            <ReactQuill
              id="content"
              ref={description}
              className="mt-1 p-2 border  bg-slate-500 rounded-md "
            />
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {err}
            </p>
          </div>
          <button
            onClick={handleUpdate}
            type="submit"
            className="bg-gray-800 hover:bg-blue-900  text-white py-2 px-4 rounded-md"
          >
            {postdata.data.new ? "Submit" : "Update"}
          </button>
          {!postdata.data.new && (
            <button
              onClick={handleDelete}
              type="submit"
              className="bg-gray-800 hover:bg-blue-900 mx-2 text-white py-2 px-4 rounded-md"
            >
              DeletePost
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Editor;

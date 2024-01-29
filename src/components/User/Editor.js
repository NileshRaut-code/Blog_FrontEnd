import React, { use, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Editor = (postdata) => {
  const title = useRef(null);
  const slug = useRef(null);
  const description = useRef(null);
  const [err, seterr] = useState("");
  const pId = postdata.data.pId;
  const navigate = useNavigate();
  useEffect(() => {
    if (postdata) {
      title.current.value = postdata.data.title || "";
      slug.current.value = postdata.data.slug || "";
      // For ReactQuill, use its API to set content
      if (description.current) {
        description.current.getEditor().root.innerHTML =
          postdata.data.description || "";
      }
    }
  }, [postdata]);

  function handleUpdate() {
    const data = {
      title: title?.current?.value,
      slug: slug?.current?.value,
      description: description?.current?.value,
    };
    const body = JSON.stringify(data);
    if (postdata.data.new == true) {
      //console.log(body);
      axios
        .post(
          `https://blogbackendnilesh.up.railway.app/api/v1/blog/addpost`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // //console.log(res);
          navigate(`/blog/${res.data.data.slug}`);
        })
        .catch((err) => {
          ////console.log(err);
          navigate("/404");
        });
    }
    if (postdata.data.new == false) {
      axios
        .put(
          `https://blogbackendnilesh.up.railway.app/api/v1/blog/post/edit/${pId}`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          ////console.log(res);
          navigate(`/blog/${res.data.data.slug}`);
        })
        .catch((err) => {
          ////console.log(err);
          //navigate("/404");
          seterr("You Have No Rights to Update Post ");
        });
    }
  }
  const handleDelete = (value) => {
    axios
      .delete(
        `https://blogbackendnilesh.up.railway.app/api/v1/blog/post/delete/${pId}`
      )
      .then((res) => {
        ////console.log(res);
        navigate("/");
      })
      .catch((err) => {
        ////console.log(err);
        //navigate("/404");
        seterr("You Have No Rights to Delete Post ");
      });
  };
  const handleContentChange = (value) => {
    //console.log(value);
  };

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
    <div className="container  min-h-screen mx-auto p-4">
      <div className="md:w-1/2 mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              ref={title}
              onChange={handleTitleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug:
            </label>
            <input
              id="slug"
              type="text"
              ref={slug}
              className="mt-1 p-2 w-full border rounded-md"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content:
            </label>
            <ReactQuill
              id="content"
              ref={description}
              onChange={handleContentChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleUpdate}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {postdata.data.new ? "Submit" : "Update"}
          </button>
          {!postdata.data.new && (
            <button
              onClick={handleDelete}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              DeletePost
            </button>
          )}
          {err}
        </form>
      </div>
    </div>
  );
};

export default Editor;

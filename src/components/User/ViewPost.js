import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const ViewPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setdata] = useState(null);
  const REACT_APP_API_URI = process.env.REACT_APP_API_URI;

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URI}/api/v1/blog/post/${slug}`)
      .then((res) => setdata(res.data.data))
      .catch((err) => navigate("/404"));
  }, [navigate, slug, REACT_APP_API_URI]);
  return data ? (
    <>
      <div className="bg-gray-900 min-h-screen text-white p-6  ">
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
        <Link
          to={`/edit/${data?.slug}`}
          className="bg-gray-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Edit Post
        </Link>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ViewPost;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import axios from "axios";
import { useEffect } from "react";
const ViewPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setdata] = useState(null);
  useEffect(() => {
    axios
      .get(`https://blogbackendnilesh.up.railway.app/api/v1/blog/post/${slug}`)
      .then((res) => setdata(res.data.data))
      .catch((err) => navigate("/404"));
  }, []);
  return data ? (
    <>
      <div className="bg-gray-900 min-h-screen text-white p-6  ">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ViewPost;

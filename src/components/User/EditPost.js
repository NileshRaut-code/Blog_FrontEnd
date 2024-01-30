import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "./Editor.js";
import Loading from "../Loader comp/Loading.js";
import axios from "axios";
export const EditPost = () => {
  const { slug } = useParams();
  const [postdata, setPostdata] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postDataResult = await axios.get(`/api/v1/blog/post/${slug}`);
        setPostdata(postDataResult);
      } catch (error) {
        console.error("Error fetching post data:", error.response.status);
        navigate("/404");
      }
    };

    fetchData();
  }, [navigate, slug]);
  //console.log(postdata?.data?.data?._id);
  const data = {
    title: postdata?.data?.data?.title,
    slug: postdata?.data?.data?.slug,
    description: postdata?.data?.data?.description,
    pId: postdata?.data?.data?._id,
    new: false,
  };

  return postdata ? <Editor data={data} /> : <Loading />;
};

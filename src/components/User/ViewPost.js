import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify';

const ViewPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setdata] = useState(null);
  const user=useSelector(store=>store.user)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}`)
      .then((res) => {
        setdata(res.data.data);
        //console.log(res.data.data);
      })
      .catch((err) => navigate("/404"));
  }, [navigate, slug]);
  return data ? (
    <>
      <main className="pt-4 pb-4 m-4 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            
            <header className="mb-4 lg:mb-6 not-format">
              
              <address className="flex items-center justify-between mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src={data?.author?.avatar}
                    alt={data?.author?.fullName}
                  />
                  <div>
                    <Link
                      to={`/author/${data?.author?.username}`}
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {data?.author?.fullName}
                    </Link>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Writter ,Developer
                    </p>
                    {data?.createdAt && (
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        Published
                        <time
                          pubdate
                          datetime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {new Date(data?.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric" }
                          )}
                        </time>
                      </p>
                    )}
                  </div>
                </div>
                 {user.status && user.data._id === data.author._id && (
            <Link
              to={`/edit/${data?.slug}`}
              className="  bg-gray-800 p-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-all duration-300"
              title="Edit Post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
            </Link>
          )}
              </address>
              {data.image && data.image!=="undefined" && <img src={data?.image} alt={data?.title} />}
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data?.title}
              </h1>
            </header>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}
            />
          </article>
        </div>
      
      </main>
    </>
  ) : (
    <Loading />
  );
};

export default ViewPost;

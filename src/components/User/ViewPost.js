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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}`)
      .then((res) => {
        setdata(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => navigate("/404"));
  }, [navigate, slug]);
  return data ? (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
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
              </address>
              {data.image && <img src={data?.image} alt={data?.title} />}
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data?.title}
              </h1>
            </header>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </article>
        </div>
        <div className="flex justify-center items-center">
          <Link
            to={`/edit/${data?.slug}`}
            className="bg-gray-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md  focus:outline-none focus:ring focus:border-blue-300"
          >
            Edit Post
          </Link>
        </div>
      </main>
    </>
  ) : (
    <Loading />
  );
};

export default ViewPost;

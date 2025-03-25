import axios from "axios";
import React, { useEffect, useState } from "react";
import Postcart from "./Postcart.js";
import Loading from "../Loader comp/Loading.js";
import SearchBox from "./SearchBox.js";

const Home = () => {
  const [page, setPage] = useState(1);
  const limit = 9;
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/blog/allpost?page=${page}&limit=${limit}`
        );
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        
        setdata(sortedData);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="bg-[#F5EFFF] dark:bg-[#030712] min-h-[100vh]">
        <SearchBox />
        <div className="flex-wrap mx-10 flex-col md:flex-row flex items-center justify-center gap-8">
          {loading ? (
            <Loading />
          ) : (
            data?.map((data) => {
              return <Postcart key={data._id} data={data} />;
            })
          )}
        </div>
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
            disabled={!data || data?.length < limit}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
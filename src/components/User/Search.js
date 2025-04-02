import axios from "axios";
import React, { useEffect, useState } from "react";
import Postcart from "./Postcart.js";
import Loading from "../Loader comp/Loading.js";
import SearchBox from "./SearchBox.js";
import { useParams } from "react-router-dom";
export const Search = () => {
  const [allproductdata, Setallproductdata] = useState(null);
  const { searchkey } = useParams();
  useEffect(() => {
    Setallproductdata("Loading State");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/blog/allpost/search/${searchkey}`
      )
      .then((res) => {
        //console.log(res, "thiscaled");
        if (res.data.size === 0) {
          Setallproductdata("Not Found");
        } else {
          const sortedData = res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          Setallproductdata(sortedData);
        }
      })
      .catch((err) => console.log(err)); //console.log(err));
  }, [searchkey]);
  if (allproductdata === "Loading State") {
    return <Loading />;
  }
  if (allproductdata === "Not Found") {
    return (
      <div>
        <SearchBox />
        <div className="flex-wrap flex-col text-white min-h-screen flex items-center justify-center">
          <h3 className="text-3xl">NO POST FOUND</h3>
          <p>Sorry, we couldn't find any Post matching your search.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative z-10 px-4 py-8">
        <div className="w-full max-w-5xl mx-auto">      <SearchBox />

      <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="h-6 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></span>
              <span>Search </span>
            </h2>
            {!allproductdata ? (
              <div className="flex justify-center py-20">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                {allproductdata?.map((post) => (
                  <div key={post._id} className="transform hover:-translate-y-2 transition-all duration-300">
                    <Postcart data={post} />
                  </div>
                ))}
              </div>
            )}
          </div>


    </div>
    </div>
  );
};

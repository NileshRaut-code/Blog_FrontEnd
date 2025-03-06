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
        console.log(res, "thiscaled");
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
          <h2 className="text-3xl">NO POST FOUND</h2>
          <p>Sorry, we couldn't find any Post matching your search.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SearchBox />
      <div className="flex-wrap flex-col md:flex-row text-white min-h-screen flex items-center justify-center">
        {!allproductdata ? (
          <Loading />
        ) : (
          allproductdata.map((data) => {
            return <Postcart key={data._id} data={data} />;
          })
        )}
      </div>
    </div>
  );
};

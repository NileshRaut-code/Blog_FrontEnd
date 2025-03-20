import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../utils/productSlice.js";
import Postcart from "./Postcart.js";
import Loading from "../Loader comp/Loading.js";
import SearchBox from "./SearchBox.js";
const Home = () => {
  const dispatch = useDispatch();
  const allproductdata = useSelector((store) => store.products?.data);
  
  useEffect(() => {
    if (allproductdata === null) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/blog/allpost`)
        .then((res) => {
        res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          dispatch(addProduct(res.data.data));
          //console.log(allproductdata);
        }) ////console.log(res))
        .catch((err) => dispatch(removeProduct())); ////console.log(err));
    }
  }, [allproductdata, dispatch]);

  return (
    <>
      <div className="bg-[#F5EFFF] dark:bg-[#030712] min-h-[100vh]">
        <SearchBox />
        <div className="flex-wrap mx-10 flex-col md:flex-row flex items-center justify-center gap-8">
          {!allproductdata ? (
            <Loading />
          ) : (
            allproductdata.map((data) => {
              return <Postcart key={data._id} data={data} />;
              // //console.log(data);
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

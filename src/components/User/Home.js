import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, removeProduct } from "../../utils/productSlice.js";
import Productcart from "./BlogCart.js";
const Home = () => {
  const dispatch = useDispatch();
  const allproductdata = useSelector((store) => store.products.data);

  //console.log(allproductdata);
  useEffect(() => {
    if (allproductdata === null) {
      console.log("this is all product data calling");
      axios
        .get("/api/v1/blog/allpost")
        .then((res) => {
          console.log(res, "thiscaled");
          dispatch(addProduct(res.data));
          console.log(allproductdata);
        }) //console.log(res))
        .catch((err) => dispatch(removeProduct())); //console.log(err));
    }
  }, [allproductdata, dispatch]);

  return (
    <>
      <div className="bg-gradient-to-r flex-wrap flex-col md:flex-row from-gray-800 via-gray-900 to-black text-white min-h-screen flex items-center justify-center ">
        {/* {allproductdata.data.map((inf) => {
          <Productcart info />;
          // console.log(info);
        })} */}
        {!allproductdata ? (
          <h1>loafing</h1>
        ) : (
          allproductdata?.data?.map((data) => {
            // console.log(data);
            return <Productcart key={data._id} data={data} />;
          })
        )}
      </div>
    </>
  );
};

export default Home;

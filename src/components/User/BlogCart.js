import { Link } from "react-router-dom";
import "../../App.css";
const Productcart = (data) => {
  //console.log(data);
  const truncateHTML = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.substring(0, length);
  };
  return (
    <>
      <div className=" md:h-64 md:w-[30%] h-128 w-[90%] m-5  md:ml-2 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding-box bg-white  border border-opacity-20 border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{data.data.title}</h2>
        <p className="text-gray-300 mb-4">
          {data.data.description ? truncateHTML(data.data.description, 35) : ""}
        </p>
        <h4 className="font-bold mb-2">
          {data.data.author.username && (
            <Link to={`/shop/${data?.data?.author?.username}`}>
              Author : {data?.data?.author?.username}
            </Link>
          )}
        </h4>

        <Link
          to={`/blog/${data?.data?.slug}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Read More
        </Link>
      </div>
    </>
  );
};

export default Productcart;

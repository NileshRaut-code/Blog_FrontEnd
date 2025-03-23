import { Link } from "react-router-dom";

const Postcart = ({ data }) => {
  const truncateHTML = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.substring(0, length)+"...";
  };

  const truncateText = (text, length) => {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + "...";
  };

  return (
    <div className="md:h-64 md:w-[30%] h-128 w-[90%] bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-20 border-black/10 dark:border-white/10 rounded-lg p-6 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <Link to={`/blog/${data?.slug}`}>
        <div className="flex flex-col justify-between h-full">
          {/* Title at the Top */}
          <h3 className="text-2xl font-bold">
            {truncateText(data.title, 50)}
          </h3>

          {/* Description in the Middle */}
          <div className="text-gray-600">
            {data.description ? truncateHTML(data.description, 90) : ""}
          </div>

          {/* Author at the Bottom */}
          {data.author?.username && (
            <h4 className="font-bold mt-auto">
              <Link to={`/author/${data.author.username}`}>
                Author: {data.author.username}
              </Link>
            </h4>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Postcart;

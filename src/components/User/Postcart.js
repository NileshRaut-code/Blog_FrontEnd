import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Postcart = ({ data }) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Calculate reading time
    if (data?.description) {
      const text = stripHTML(data.description);
      const wordsPerMinute = 200; // Average reading speed
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wordsPerMinute);
      setReadingTime(time || 1); // Minimum 1 minute
    }
  }, [data?.description]);

  const truncateHTML = (html, length) => {
    if (!html) return "";
    const textContent = stripHTML(html);
    return textContent.substring(0, length) + "...";
  };

  const truncateText = (text, length) => {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + "...";
  };

  // Format date if available
  const formattedDate = data.createdAt 
    ? new Date(data.createdAt).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      })
    : "";

  // Function to strip HTML tags from description
  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <article 
      className="flex flex-col bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                rounded-2xl overflow-hidden h-full
                shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                border border-white/20 dark:border-white/5
                transition-all duration-300
                hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      {/* Hidden SEO metadata */}
      <meta itemProp="headline" content={data?.title} />
      <meta itemProp="description" content={stripHTML(data?.description).substring(0, 160)} />
      {data?.author?.fullName && <meta itemProp="author" content={data?.author?.fullName} />}
      {data?.createdAt && <meta itemProp="datePublished" content={new Date(data?.createdAt).toISOString()} />}
      
      {/* Post Image (if available) - Fixed height */}
      <div className="w-full h-40">
        {data.image && data.image !== "undefined" ? (
          <Link to={`/blog/${data?.slug}`} className="block w-full h-full">
            <img 
              src={data.image} 
              alt={data.title} 
              className="w-full h-full object-cover transition-transform duration-700 transform hover:scale-110"
              itemProp="image"
            />
          </Link>
        ) : (
          <Link to={`/blog/${data?.slug}`} className="block w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </Link>
        )}
      </div>
      
      {/* Content and footer container */}
      <div className="flex flex-col flex-grow p-5">
        {/* Main content area - with flex-grow */}
        <Link to={`/blog/${data?.slug}`} className="block flex-grow">
          <div className="flex flex-col h-full">
            {/* Meta info at the top */}
            <div className="flex justify-between items-center mb-3">
              {/* Category/Tag (if available) */}
              {data.category && (
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full 
                              bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  {data.category}
                </span>
              )}
              
              {/* Reading time */}
              {readingTime > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
              )}
            </div>
            
            {/* Title */}
            <h2 
              className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 
                       line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 
                       transition-colors duration-300"
              itemProp="headline"
            >
              {truncateText(data.title, 60)}
            </h2>

            {/* Description - Fixed height with ellipsis */}
            <div className="mb-4 min-h-[4.5rem]">
              <p 
                className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3"
                itemProp="description"
              >
                {data.description ? truncateHTML(data.description, 120) : ""}
              </p>
            </div>
          </div>
        </Link>

        {/* Author & Date Footer - Explicitly separated with margin-top */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/20 dark:border-gray-700/20">
          {data.author && (
            <div className="flex items-center" itemProp="author" itemScope itemType="http://schema.org/Person">
              {data.author.avatar && (
                <img 
                  src={data.author.avatar} 
                  alt={data.author.username} 
                  className="w-7 h-7 rounded-full mr-2 object-cover border border-white/20 dark:border-gray-800/40"
                />
              )}
              <span 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]"
                itemProp="name"
              >
                {data.author.username}
              </span>
            </div>
          )}
          
          {formattedDate && (
            <time 
              className="text-xs text-gray-500 dark:text-gray-400"
              dateTime={data.createdAt ? new Date(data.createdAt).toISOString() : ''}
              itemProp="datePublished"
            >
              {formattedDate}
            </time>
          )}
        </div>
      </div>
    </article>
  );
};

export default Postcart;

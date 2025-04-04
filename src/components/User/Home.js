import axios from "axios";
import React, { useEffect, useState } from "react";
import Postcart from "./Postcart.js";
import Loading from "../Loader comp/Loading.js";
import SearchBox from "./SearchBox.js";

const Home = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  // Sample topics for filtering - these would ideally come from your API
  const topics = ["Technology", "Development", "Design", "AI", "Web3"];

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
        
        // Set featured post to the most recent or most viewed post
        if (sortedData.length > 0) {
          setFeaturedPost(sortedData[0]);
          // Remove featured post from regular posts
          setdata(sortedData.slice(1));
        } else {
          setdata(sortedData);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus({ success: false, message: "Please enter a valid email address." });
      return;
    }
    
    setTimeout(() => {
      setSubscribeStatus({ success: true, message: "Thanks for subscribing! Check your email for confirmation." });
      setEmail("");
      setTimeout(() => setSubscribeStatus(null), 5000);
    }, 1000);
  };

  const truncateText = (text, length) => {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + "...";
  };

  // Function to strip HTML tags from description
  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="relative min-h-screen">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl transform translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 px-4 py-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Hero section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-gradient-slow bg-gradient-size">
              Discover Insights
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
              Explore the latest in technology, development, and problem-solving techniques from our community
            </p>
          </div>
          
          {/* Search box */}
          <div className="mb-12 transform hover:scale-[1.01] transition-all duration-300">
            <SearchBox />
          </div>

          {/* Featured post */}
          {!loading && featuredPost && (
            <div className="mb-16 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="h-6 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></span>
                <span>Featured Article</span>
              </h2>
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                             rounded-2xl overflow-hidden 
                             shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                             border border-white/20 dark:border-white/5
                             transition-all duration-300
                             hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Featured image */}
                  <div className="relative h-60 md:h-full overflow-hidden">
                    {featuredPost.image && featuredPost.image !== "undefined" ? (
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 transform hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 flex items-center justify-center">
                        <svg className="w-24 h-24 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-l"></div>
                  </div>
                  
                  {/* Featured content */}
                  <div className="p-6 md:pr-8 flex flex-col md:justify-center">
                    {featuredPost.category && (
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full 
                                    bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        {featuredPost.category}
                      </span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100 
                                 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 
                                 transition-colors duration-300">
                      <a href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</a>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {featuredPost.description && stripHTML(featuredPost.description).substring(0, 150)}...
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        {featuredPost.author?.avatar && (
                          <img 
                            src={featuredPost.author.avatar} 
                            alt={featuredPost.author.username} 
                            className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-white/50 dark:border-gray-800/50"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">
                            {featuredPost.author?.fullName || featuredPost.author?.username}
                          </p>
                          {featuredPost.createdAt && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(featuredPost.createdAt).toLocaleDateString("en-US", { 
                                month: "long", 
                                day: "numeric",
                                year: "numeric" 
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <a 
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium hover:underline"
                      >
                        Read more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Topic filters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="h-6 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></span>
              <span>Explore Topics</span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10"
                }`}
              >
                All
              </button>
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleFilter(topic.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === topic.toLowerCase()
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          {/* Posts grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="h-6 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></span>
              <span>Latest Articles</span>
            </h2>
            {loading ? (
              <div className="flex justify-center py-20">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                {data?.map((post) => (
                  <div key={post._id} className="transform hover:-translate-y-2 transition-all duration-300">
                    <Postcart data={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Newsletter subscription */}
          <div className="mb-16 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl overflow-hidden border border-white/10 dark:border-white/5 backdrop-blur-xl p-8 md:p-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:flex-1">
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Get the latest insights
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Join our newsletter and receive weekly updates on new articles, tips, and knowledge.
                  </p>
                </div>
                <div className="md:flex-1">
                  <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="block w-full pl-10 pr-3 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-md
                                 border border-gray-300/50 dark:border-gray-700/50 rounded-xl
                                 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                                 transition-all duration-300
                                 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-medium
                             bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                             shadow-lg shadow-purple-500/20 dark:shadow-indigo-500/30
                             transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                             hover:shadow-purple-500/30 dark:hover:shadow-indigo-500/40"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Subscribe Now</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15" />
                        </svg>
                      </span>
                    </button>
                    {subscribeStatus && (
                      <p className={`text-sm ${subscribeStatus.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {subscribeStatus.message}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-6 py-2.5 rounded-xl font-medium
                       bg-white/10 dark:bg-white/5 backdrop-blur-xl
                       border border-white/20 dark:border-white/5
                       shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                       transition-all duration-300 disabled:opacity-50
                       hover:shadow-[0_8px_30px_rgba(120,113,255,0.3)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]
                       hover:bg-white/20 dark:hover:bg-white/10
                       text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </div>
            </button>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!data || data?.length < limit-1} // Adjusted for featured post
              className="px-6 py-2.5 rounded-xl font-medium
                       bg-white/10 dark:bg-white/5 backdrop-blur-xl
                       border border-white/20 dark:border-white/5
                       shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                       transition-all duration-300 disabled:opacity-50
                       hover:shadow-[0_8px_30px_rgba(120,113,255,0.3)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]
                       hover:bg-white/20 dark:hover:bg-white/10
                       text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center gap-2">
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
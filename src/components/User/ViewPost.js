import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify';

const ViewPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setdata] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef(null);
  const user = useSelector(store => store.user);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}`)
      .then((res) => {
        setdata(res.data.data);
        // Calculate reading time
        if (res.data.data.description) {
          const text = res.data.data.description.replace(/<[^>]*>/g, '');
          const wordsPerMinute = 200; // Average reading speed
          const words = text.trim().split(/\s+/).length;
          const time = Math.ceil(words / wordsPerMinute);
          setReadingTime(time);
        }
      })
      .catch((err) => navigate("/404"));
  }, [navigate, slug]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const scrollY = window.scrollY;
        const articleHeight = articleRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const progress = Math.min(100, (scrollY / (articleHeight - windowHeight)) * 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to copy current URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };
  
  return data ? (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Reading progress bar - fixed to top */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl transform translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <article 
          ref={articleRef} 
          className="bg-white/10 dark:bg-black/10 backdrop-blur-xl 
                     rounded-2xl overflow-hidden 
                     shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
                     border border-white/20 dark:border-white/5
                     transition-all duration-300
                     hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]
                     animate-fadeIn"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          {/* Hidden SEO metadata */}
          <meta itemProp="headline" content={data?.title} />
          <meta itemProp="description" content={data?.description?.replace(/<[^>]*>/g, '').substring(0, 160)} />
          <meta itemProp="author" content={data?.author?.fullName} />
          {data?.createdAt && <meta itemProp="datePublished" content={new Date(data?.createdAt).toISOString()} />}
          
          {/* Post header */}
          <div className="p-6 lg:p-8">
            {/* Category/Tags if available */}
            {data.category && (
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full 
                              bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  {data.category}
                </span>
              </div>
            )}
            
            {/* Post title */}
            <h1 
              className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-6 
                        bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 
                        leading-tight tracking-tight"
              itemProp="headline"
            >
              {data?.title}
            </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
                    {readingTime > 0 && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{readingTime} min read</span>
                    </div>
                    )}
                    
                  

            {data?.createdAt && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time dateTime={new Date(data?.createdAt).toISOString()} itemProp="datePublished">
                      {new Date(data?.createdAt).toLocaleDateString("en-US", { 
                        month: "long", 
                        day: "numeric",
                        year: "numeric" 
                      })}
                      </time>
                    </div>
                    )}

{data?.views && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
                      <circle cx="12" cy="12" r="3" />
                      </svg>
                      <p>{data?.views}</p>
                    </div>
                    )}
                  </div>
                  
                  {/* Author info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 
                          p-4 bg-white/5 dark:bg-white/5 rounded-xl border border-white/10 dark:border-white/5">
              <div className="flex items-center">
                <div className="relative group mr-4">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 blur-sm group-hover:blur-md group-hover:opacity-100 transition-all duration-500"></div>
                  <img
                    className="relative w-16 h-16 rounded-full border-2 border-white/50 dark:border-gray-800/50 
                             shadow-lg transition-transform duration-500 transform group-hover:scale-105 object-cover"
                    src={data?.author?.avatar}
                    alt={data?.author?.fullName}
                    itemProp="image"
                  />
                </div>
                
                <div itemProp="author" itemScope itemType="http://schema.org/Person">
                  <Link
                    to={`/author/${data?.author?.username}`}
                    className="text-xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                    itemProp="name"
                  >
                    {data?.author?.fullName}
                  </Link>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Writer, Developer
                  </p>
                  <div className="mt-2 flex items-center">
                    <Link to={`/author/${data?.author?.username}`} className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                      View all posts
                    </Link>
                  </div>
                </div>
              </div>
              
              {user.status && user.data._id === data.author._id && (
                <Link
                  to={`/edit/${data?.slug}`}
                  className="group flex items-center justify-center p-3 
                          bg-white/10 dark:bg-white/5 backdrop-blur-md 
                          rounded-full shadow-lg hover:shadow-purple-500/20
                          transition-all duration-300 transform hover:scale-110"
                  title="Edit Post"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </Link>
              )}
            </div>
            
            {/* Feature image */}
            {data.image && data.image !== "undefined" && (
              <figure className="rounded-xl overflow-hidden mb-8 shadow-lg">
                <img 
                  src={data?.image} 
                  alt={data?.title}
                  className="w-full h-auto object-cover"
                  itemProp="image"
                />
                {data?.imageCaption && (
                  <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    {data.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
          
          {/* Post content */}
          <div className="px-6 lg:px-8 pb-8">
            <div
              className="prose prose-lg max-w-full dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-gray-100 
                       prose-a:text-purple-600 dark:prose-a:text-purple-400 
                       prose-img:rounded-xl prose-img:shadow-lg
                       prose-p:text-gray-700 dark:prose-p:text-gray-300
                       prose-p:leading-relaxed prose-li:leading-relaxed
                       prose-headings:leading-tight prose-headings:tracking-tight
                       prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
                       prose-blockquote:border-l-4 prose-blockquote:border-purple-500
                       prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-gray-800/30
                       prose-blockquote:pl-5 prose-blockquote:py-2 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}
              itemProp="articleBody"
            />
          </div>

          {/* Social sharing */}
          <div className="px-6 lg:px-8 pb-8 border-t border-gray-200/20 dark:border-gray-700/20 pt-8">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Share this article</h3>
            <div className="flex space-x-3">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data?.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors duration-300"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#4267B2]/10 text-[#4267B2] hover:bg-[#4267B2]/20 transition-colors duration-300"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(data?.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors duration-300"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <button
                onClick={copyToClipboard}
                className="p-3 rounded-full bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                aria-label="Copy link"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </article>
        
        {/* Back button */}
      
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ViewPost;

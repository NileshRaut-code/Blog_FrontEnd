import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="mb-0">
      <div className="mx-auto w-full max-w-screen-xl p-6 py-10 lg:py-12">
        <div className="relative bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-2xl 
                      shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.03)]
                      border border-white/10 dark:border-white/5
                      p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(120,113,255,0.2)]">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <Link to={"/"} className="flex items-center group">
                <img
                  src="https://www.nileshblog.tech/wp-content/uploads/2023/12/NileshBlog.Tech-Software-Development-Learning-Problem-Solving-Platform.svg"
                  className="h-10 me-3 transition-all duration-500 transform group-hover:scale-110 dark:invert"
                  alt="Lonar Markate Placee Logo"
                />
                <span className="self-center text-2xl font-semibold bg-clip-text text-transparent 
                               bg-gradient-to-r from-purple-500 to-indigo-500
                               transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500"></span>
              </Link>
              
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md text-sm">
                A platform for software developers to learn, share knowledge, and build their careers.
                Join our community of passionate developers.
              </p>

              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
              <div>
                <div className="mb-6 text-sm font-bold uppercase text-transparent bg-clip-text 
                                bg-gradient-to-r from-purple-500 to-indigo-500">
                  Resources
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to={"https://www.nileshblog.tech"}
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        NileshBlog.Tech
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"https://www.nileshblog.tech"}
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        Technilesh.com
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"https://dev.to/speaklouder"}
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        Speaklouder
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="mb-6 text-sm font-bold uppercase text-transparent bg-clip-text 
                                bg-gradient-to-r from-purple-500 to-indigo-500">
                  Follow us
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to={"/"} 
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        Github
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={"/"} 
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        Discord
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="mb-6 text-sm font-bold uppercase text-transparent bg-clip-text 
                                bg-gradient-to-r from-purple-500 to-indigo-500">
                  Legal
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to={"/"} 
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        Privacy Policy
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={"/"} 
                      className="text-gray-500 dark:text-gray-400 transition-all duration-300 
                               hover:text-purple-500 dark:hover:text-purple-400 
                               relative inline-block overflow-hidden group"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                        Terms &amp; Conditions
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 
                                    transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200/10 dark:border-gray-700/30">
            <div className="sm:flex sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <Link to={"/"} className="hover:text-purple-500 transition-colors duration-300">
                  NileshRaut™
                </Link>
                . All Rights Reserved.
              </p>
              
              <div className="flex mt-4 sm:mt-0 space-x-5">
                <Link
                  to={"https://www.instagram.com/nileshblog_tech/?hl=en"}
                  className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">Facebook page</span>
                </Link>
                
                <Link
                  to={"https://www.instagram.com/nileshblog_tech/?hl=en"}
                  className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                  </svg>
                  <span className="sr-only">Discord community</span>
                </Link>
                
                <Link
                  to={"https://www.instagram.com/nileshblog_tech/?hl=en"}
                  className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </Link>
                
                <Link
                  to={"/https://github.com/NileshRaut-code"}
                  className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">GitHub account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

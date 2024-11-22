import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full sm:w-[90%] lg:w-[70.6%] mx-auto mt-2 py-4 bg-[linear-gradient(45deg,_#6E00FF,_#DB0153,#0130BC)] text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:space-y-0 space-y-4 sm:space-x-6">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">회사 이름 : BLOBUS</h3>
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
        </div>
        <div className="flex sm:flex-row flex-col sm:space-x-6 sm:mt-0 mt-4 sm:text-left text-center">
          <Link to="/#" className="hover:text-gray-300 transition duration-500">
            About Us
          </Link>
          <Link to="/#" className="hover:text-gray-300 transition duration-500">
            Contact
          </Link>
          <Link to="/#" className="hover:text-gray-300 transition duration-500">
            Privacy Policy
          </Link>
          <Link to="/#" className="hover:text-gray-300 transition duration-500">
            Terms of Service
          </Link>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-sm">Follow us:</p>
          <div className="flex justify-center sm:justify-end space-x-4 mt-2">
            <Link
              to="/#"
              className="text-xl hover:text-gray-300 transition duration-500"
            >
              Facebook
            </Link>
            <Link
              to="/#"
              className="text-xl hover:text-gray-300 transition duration-500"
            >
              Twitter
            </Link>
            <Link
              to="/#"
              className="text-xl hover:text-gray-300 transition duration-500"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

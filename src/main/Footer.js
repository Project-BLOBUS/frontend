import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full sm:w-[69.7%] sm:ml-[15.1%] mx-auto py-4 mt-3 bg-[linear-gradient(45deg,_#6E00FF,_#DB0153,#0130BC)] text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:space-y-0 space-y-4 sm:space-x-6">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">회사 이름 : BLOBUS</h3>
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
        </div>
        <div className="flex sm:flex-row flex-col sm:space-x-6 sm:mt-0 mt-4 sm:text-left text-center">
          <Link
            to="/#"
            className="hover:text-gray-300 transition duration-500 mt-8"
          >
            About Us
          </Link>
          <Link
            to="/#"
            className="hover:text-gray-300 transition duration-500 mt-8"
          >
            Contact
          </Link>
          <Link
            to="/#"
            className="hover:text-gray-300 transition duration-500 mt-8"
          >
            Privacy Policy
          </Link>
          <Link
            to="/#"
            className="hover:text-gray-300 transition duration-500 mt-8"
          >
            Terms of Service
          </Link>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-sm">Follow us:</p>
          <div className="flex justify-center sm:justify-end space-x-4 mt-2">
            <Link
              to="/#"
              className="text-3xl hover:text-gray-300 transition duration-500"
            >
              <FaYoutube />
            </Link>
            <Link
              to="/#"
              className="text-3xl hover:text-gray-300 transition duration-500"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/#"
              className="text-3xl hover:text-gray-300 transition duration-500"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

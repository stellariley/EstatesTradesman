import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-3xl font-bold text-black hover:text-blue-600">
          EstatesTradesman
        </a>

        {/* Links */}
        <div className={`links ${show ? "block" : "hidden"} sm:block`}>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                onClick={() => setShow(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                onClick={() => setShow(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600"
                >
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600"
                >
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Hamburger Menu Icon */}
        <GiHamburgerMenu
          className="text-3xl cursor-pointer sm:hidden"
          onClick={() => setShow(!show)}
        />
      </div>
    </nav>
  );
};

export default Navbar;

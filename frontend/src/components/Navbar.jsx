import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div ref={navRef} className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo on the left */}
        <a href="/" className="text-3xl font-bold text-black hover:text-blue-600">
          EstatesTradesman
        </a>

        {/* Links aligned to the right */}
        <div className="ml-auto hidden sm:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <GiHamburgerMenu
          className="text-3xl cursor-pointer sm:hidden ml-auto"
          onClick={() => setShow(!show)}
        />

        {/* Mobile Dropdown */}
        <div className={`absolute top-full right-0 w-full bg-white shadow-lg sm:hidden ${show ? "block" : "hidden"}`}>
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link to="/" onClick={() => setShow(false)} className="text-lg font-medium text-gray-700 hover:text-blue-600">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setShow(false)} className="text-lg font-medium text-gray-700 hover:text-blue-600">
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" onClick={() => setShow(false)} className="text-lg font-medium text-gray-700 hover:text-blue-600">
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={() => setShow(false)} className="text-lg font-medium text-gray-700 hover:text-blue-600">
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
    <nav className="navbar">
      <div ref={navRef} className="navbarContainer">
        <a href="/" className="logo">
          EstatesTradesman
        </a>

        <div className="linksContainer">
          <ul className="linksList">
            <li>
              <Link to="/" className="link">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="link">
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" className="link">
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>

        <GiHamburgerMenu
          className="mobileMenuIcon"
          onClick={() => setShow(!show)}
        />

        <div className={`mobileMenu ${show ? 'show' : ''}`}>
          <ul className="mobileMenuList">
            <li>
              <Link to="/" onClick={() => setShow(false)} className="mobileLink">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setShow(false)} className="mobileLink">
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" onClick={() => setShow(false)} className="mobileLink">
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={() => setShow(false)} className="mobileLink">
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

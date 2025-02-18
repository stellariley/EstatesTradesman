import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './Navbar.module.css';

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
    <nav className={styles.navbar}>
      <div ref={navRef} className={styles.navbarContainer}>
        <a href="/" className={styles.logo}>
          EstatesTradesman
        </a>

        <div className={styles.linksContainer}>
          <ul className={styles.linksList}>
            <li>
              <Link to="/" className={styles.link}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/jobs" className={styles.link}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" className={styles.link}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className={styles.link}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>

        <GiHamburgerMenu
          className={styles.mobileMenuIcon}
          onClick={() => setShow(!show)}
        />

        <div className={`${styles.mobileMenu} ${show ? styles.show : ''}`}>
          <ul className={styles.mobileMenuList}>
            <li>
              <Link to="/" onClick={() => setShow(false)} className={styles.mobileLink}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setShow(false)} className={styles.mobileLink}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" onClick={() => setShow(false)} className={styles.mobileLink}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={() => setShow(false)} className={styles.mobileLink}>
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

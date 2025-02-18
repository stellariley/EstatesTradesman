import { Link } from "react-router-dom"; 
import { useSelector } from "react-redux";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer className="footer">
        <div className="container grid">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start mb-8 md:mb-0">
            <img src="/logo.png" alt="logo" className="logo" />
          </div>

          {/* Support Section */}
          <div>
            <h4 className="section-title">Support</h4>
            <ul className="section-content">
              <li><strong className="text-white">Address:</strong> 9711 S. Mason Road 125-403 Richmond, TX 77407-7167</li>
              <li><strong className="text-white">Email:</strong> <a href="mailto:admin@greenlightpropertygroup.com">admin@greenlightpropertygroup.com</a></li>
              <li><strong className="text-white">Contact:</strong> <a href="tel:+19802548338">980-254-8338</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="section-title">Quick Links</h4>
            <ul className="section-quick-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="section-title">Follow Us</h4>
            <div className="social-icons">
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <FaTwitter size={30} />
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <FaInstagram size={30} />
              </Link>
              <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on YouTube">
                <FaYoutube size={30} />
              </Link>
              <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                <FaLinkedin size={30} />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-note">
        &copy; {new Date().getFullYear()}. All Rights Reserved By Greenlight Property Recovery.
      </div>
    </>
  );
}

export default Footer;

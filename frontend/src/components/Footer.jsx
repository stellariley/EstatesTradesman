import { Link } from "react-router-dom"; 
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <img src="/logo.png" alt="logo" className="h-20 md:h-24" /> {/* Increased size */}
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-semibold text-xl mb-4">Support</h4>
            <ul className="space-y-2">
              <li><strong>Address:</strong> 9711 S. Mason Road 125-403 Richmond, TX 77407-7167</li>
              <li><strong>Email:</strong> admin@greenlightpropertygroup.com</li>
              <li><strong>Contact:</strong> 980-254-8338</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-semibold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-gray-400">Jobs</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="font-semibold text-xl mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition">
                <FaSquareXTwitter size={24} />
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition">
                <FaSquareInstagram size={24} />
              </Link>
              <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition">
                <FaYoutube size={24} />
              </Link>
              <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-gray-900 text-center text-sm text-gray-400 py-4">
        &copy; {new Date().getFullYear()}. All Rights Reserved By Greenlight Property Recovery.
      </div>
    </>
  );
};

export default Footer;

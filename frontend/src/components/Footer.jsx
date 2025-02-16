import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

function Footer (){
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start mb-8 md:mb-0">
            <img src="/logo.png" alt="logo" className="h-24 object-contain" />
          </div>

          {/* Support Section */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-lg text-gray-300">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><strong className="text-white">Address:</strong> 9711 S. Mason Road 125-403 Richmond, TX 77407-7167</li>
              <li><strong className="text-white">Email:</strong> <a href="mailto:admin@greenlightpropertygroup.com" className="hover:text-gray-200 transition">admin@greenlightpropertygroup.com</a></li>
              <li><strong className="text-white">Contact:</strong> <a href="tel:+19802548338" className="hover:text-gray-200 transition">980-254-8338</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-lg text-gray-300">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-gray-200 transition duration-300">Jobs</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard" className="hover:text-gray-200 transition duration-300">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-lg text-gray-300">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-6">
              <div>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter size={30} />
                </Link>
              </div>
              <div>
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram size={30} />
                </Link>
              </div>
              <div>
                <Link
                  to="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition duration-300"
                  aria-label="Follow us on YouTube"
                >
                  <FaYoutube size={30} />
                </Link>
              </div>
              <div>
                <Link
                  to="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <FaLinkedin size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()}. All Rights Reserved By Greenlight Property Recovery.
      </div>
    </>
  );
};

export default Footer;

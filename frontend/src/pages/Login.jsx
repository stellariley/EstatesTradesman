import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/"); // Redirect after successful login
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-700">Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Login As</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2">
              <select
                className="flex-1 p-2 border-none outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Business Owner">Login as a Business Owner</option>
                <option value="Tradesman">Login as a Tradesman</option>
              </select>
              <FaRegUser className="text-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 border-none outline-none"
              />
              <MdOutlineMailOutline className="text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 mt-2">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2 border-none outline-none"
              />
              <RiLock2Fill className="text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <Link
              to={"/register"}
              className="text-blue-600 hover:underline"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

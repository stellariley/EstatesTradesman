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

  const loginHandler = () => {
    if (!role) {
      toast.error("Please select a role before logging in with Google.");
      return;
    }
    window.location.href = `http://localhost:4000/api/v1/user/auth/google?role=${role}`;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <section className="loginPage">
      <div className="container login-container">
        <div className="header">
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Business Owner">Login as a Business Owner</option>
                <option value="Tradesman">Login as a Tradesman</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          {/* Email */}
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          {/* Password */}
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <p className="forgot-password">
            <Link to={"/password/forgot"}>Forgot your password?</Link>
          </p>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {/* Register Link */}
          <div className="register-link">
            <Link to={"/register"} className="register-now">
              <p>Do not have an account? </p>
              <span>Register Now</span>
            </Link>
          </div>

          {/* Google Login Button */}
          <div
            className="google-login-wrapper"
            onClick={loginHandler}
            disabled={!role}
          >
            <span className="google-icon"></span>
            <span className="google-login-text">Login with Google</span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstSkill, setFirstSkill] = useState("");
  const [secondSkill, setSecondSkill] = useState("");
  const [thirdSkill, setThirdSkill] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const skillsArray = [
    "Carpentry",
    "Plumbing",
    "Electrical Work",
    "HVAC Installation & Repair",
    "Roofing",
    "Painting",
    "Masonry",
    "Flooring Installation",
    "Landscaping",
    "Welding",
    "General Contracting",
    "Framing",
    "Drywall Installation & Repair",
    "Tiling",
    "Concrete Work",
    "Window & Door Installation",
    "Insulation Installation",
    "Pest Control",
    "Septic System Services",
    "Handyman Services",
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegsiter = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Tradesman") {
      formData.append("firstSkill", firstSkill);
      formData.append("secondSkill", secondSkill);
      formData.append("thirdSkill", thirdSkill);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  const loginHandler = () => {
    if (!role) {
      toast.error("Please select a role before logging in with Google.");
      return;
    }
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/auth/google?role=${role}`;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success(message);
      navigateTo(`/otp-verification/${email}/${phone}`);
    }
  }, [dispatch, error, loading, isAuthenticated, message, email, phone, navigateTo]);

  return (
    <section className="registerPage">
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegsiter}>
          {/* Role Selection */}
          <div className="wrapper">
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Business Owner">Register as Business Owner</option>
                  <option value="Tradesman">Register as Tradesman</option>
                </select>
                <FaRegUser />
              </div>
            </div>
          </div>

          {/* Name and Email */}
          <div className="wrapper">
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
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
          </div>

          <div className="wrapper">
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="111-222-3333"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Address</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaAddressBook />
              </div>
            </div>
          </div>

          <div className="wrapper">
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
          </div>

          {/* Tradesman Fields */}
          {role === "Tradesman" && (
            <>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Your First Skill</label>
                  <div>
                    <select value={firstSkill} onChange={(e) => setFirstSkill(e.target.value)}>
                      <option value="">Select Skill</option>
                      {skillsArray.map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Your Second Skill</label>
                  <div>
                    <select value={secondSkill} onChange={(e) => setSecondSkill(e.target.value)}>
                      <option value="">Select Skill</option>
                      {skillsArray.map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Your Third Skill</label>
                  <div>
                    <select value={thirdSkill} onChange={(e) => setThirdSkill(e.target.value)}>
                      <option value="">Select Skill</option>
                      {skillsArray.map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Cover Letter</label>
                  <div>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                    />
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Resume</label>
                  <div>
                    <input type="file" onChange={resumeHandler} />
                  </div>
                </div>
              </div>
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <div className="register-link">
            <Link to={"/login"} className="register-now">
            <p>Already have an account?  </p>
              <span>Login Here</span>
            </Link>
          </div>

          <div className="or">OR</div>

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

export default Register;

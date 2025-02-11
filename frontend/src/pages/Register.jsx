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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <section className="authPage bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="container bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <div className="header mb-6">
          <h3 className="text-2xl font-semibold text-center">Create a new account</h3>
        </div>
        <form onSubmit={handleRegsiter}>
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Register As</label>
            <div className="flex items-center mt-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Role</option>
                <option value="Business Owner">Register as Business Owner</option>
                <option value="Tradesman">Register as Tradesman</option>
              </select>
              <FaRegUser className="ml-2" />
            </div>
          </div>

          {/* Name and Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <div className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              />
              <FaPencilAlt className="ml-2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email Address</label>
            <div className="flex items-center mt-2">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              />
              <MdOutlineMailOutline className="ml-2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="flex items-center mt-2">
              <input
                type="number"
                placeholder="111-222-333"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              />
              <FaPhoneFlip className="ml-2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <div className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              />
              <FaAddressBook className="ml-2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <div className="flex items-center mt-2">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              />
              <RiLock2Fill className="ml-2" />
            </div>
          </div>

          {/* Tradesman Fields */}
          {role === "Tradesman" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium">Your First Skill</label>
                <select
                  value={firstSkill}
                  onChange={(e) => setFirstSkill(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Skill</option>
                  {skillsArray.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                <MdCategory className="absolute right-2 top-2" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Your Second Skill</label>
                <select
                  value={secondSkill}
                  onChange={(e) => setSecondSkill(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Skill</option>
                  {skillsArray.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Your Third Skill</label>
                <select
                  value={thirdSkill}
                  onChange={(e) => setThirdSkill(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Skill</option>
                  {skillsArray.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Resume</label>
                <input
                  type="file"
                  onChange={resumeHandler}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;

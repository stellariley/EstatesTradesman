import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstSkill, setFirstSkill] = useState(user && user.skills?.firstSkill);
  const [secondSkill, setSecondSkill] = useState(
    user && user.skills?.secondSkill
  );
  const [thirdSkill, setThirdSkill] = useState(user && user.skills?.thirdSkill);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === "Tradesman") {
      formData.append("firstSkill", firstSkill);
      formData.append("secondSkill", secondSkill);
      formData.append("thirdSkill", thirdSkill);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

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

  return (
    <div className="account_components">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Profile</h3>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {user && user.role === "Tradesman" && (
        <>
          <div>
            <label>My Preferred Job Skills</label>
            <div>
              <select
                value={firstSkill}
                onChange={(e) => setFirstSkill(e.target.value)}
    
              >
                {skillsArray.map((element, index) => (
                  <option value={element} key={index}>
                    {element}
                  </option>
                ))}
              </select>
              <select
                value={secondSkill}
                onChange={(e) => setSecondSkill(e.target.value)}
    
              >
                {skillsArray.map((element, index) => (
                  <option value={element} key={index}>
                    {element}
                  </option>
                ))}
              </select>
              <select
                value={thirdSkill}
                onChange={(e) => setThirdSkill(e.target.value)}
    
              >
                {skillsArray.map((element, index) => (
                  <option value={element} key={index}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label>Coverletter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
  
            />
          </div>
          <div>
            <label>Upload Resume</label>
            <input
              type="file"
              onChange={resumeHandler}
  
            />
            {user && user.resume && (
              <div>
                <p>Current Resume:</p>
                <Link
                  to={user.resume && user.resume.url}
                  target="_blank"
                  className="view-resume"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;

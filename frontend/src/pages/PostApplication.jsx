import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <div className="home">
      <article className="application_page">
        <form onSubmit={handlePostApplication}>
          <h3>Application Form</h3>
          <div>
            <label>Job Title</label>
            <input
              type="text"
              placeholder={singleJob.title}
              disabled
            />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
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
                <label>Cover Letter</label>
                <textarea

                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                />
              </div>
              <div>
                <label>Resume</label>
                <input
                  type="file"

                  onChange={resumeHandler}
                />
              </div>
            </>
          )}
          {isAuthenticated && user.role === "Tradesman" && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn"
                disabled={loading}
              >
                {loading ? "Applying..." : "Apply"}
              </button>
            </div>
          )}
        </form>

        <div className="job-details">
          <header className="text-center">
            <h3>{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link
                to={singleJob.personalWebsite.url}
                target="_blank"
              >
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p>{singleJob.location}</p>
            <p>${singleJob.budget}</p>
          </header>
          <section>
            <div className="wrapper">
              <div>
                <IoMdCash />
                <div>
                  <span>Budget</span>
                  <span> ${singleJob.budget}</span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Job Type: </span>
                  <span> {singleJob.jobType}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="wrapper">Location</h4>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJob.location}</span>
              </div>
            </div>

            <div>
              <h4 className="wrapper">Full Job Description:</h4>
              <p>{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div>
                  <h5>Qualifications</h5>
                  <ul className="inside">
                    {qualifications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h5>Responsibilities</h5>
                  <ul className="inside">
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div>
                  <h5>Offering</h5>
                  <ul className="inside">
                    {offering.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <footer>
            <h3>Job Skill</h3>
            <p>{singleJob.jobSkill}</p>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default PostApplication;

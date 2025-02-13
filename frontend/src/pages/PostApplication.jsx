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
    <article className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <form onSubmit={handlePostApplication} className="space-y-6">
        <h3 className="text-2xl font-semibold text-center text-gray-800">Application Form</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded mt-2 bg-gray-100"
            placeholder={singleJob.title}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {user && user.role === "Tradesman" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded mt-2"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Resume</label>
              <input
                type="file"
                className="w-full p-3 border border-gray-300 rounded mt-2"
                onChange={resumeHandler}
              />
            </div>
          </>
        )}
        {isAuthenticated && user.role === "Tradesman" && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </div>
        )}
      </form>

      <div className="mt-12 space-y-6">
        <header className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800">{singleJob.title}</h3>
          {singleJob.personalWebsite && (
            <Link
              to={singleJob.personalWebsite.url}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {singleJob.personalWebsite.title}
            </Link>
          )}
          <p className="text-gray-600">{singleJob.location}</p>
          <p className="text-xl font-semibold text-gray-800">${singleJob.budget}</p>
        </header>
        <section className="mt-6 space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <IoMdCash />
              <div>
                <span className="font-semibold">Pay</span>
                <span> ${singleJob.budget}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaToolbox />
              <div>
                <span className="font-semibold">Job Type: </span>
                <span> {singleJob.jobType}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">Location</h4>
            <div className="flex items-center space-x-2">
              <FaLocationDot />
              <span>{singleJob.location}</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">Full Job Description</h4>
            <p>{singleJob.introduction}</p>
            {singleJob.qualifications && (
              <div className="mt-4">
                <h5 className="text-md font-semibold">Qualifications</h5>
                <ul className="list-inside list-disc pl-5">
                  {qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {singleJob.responsibilities && (
              <div className="mt-4">
                <h5 className="text-md font-semibold">Responsibilities</h5>
                <ul className="list-inside list-disc pl-5">
                  {responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {singleJob.offers && (
              <div className="mt-4">
                <h5 className="text-md font-semibold">Offering</h5>
                <ul className="list-inside list-disc pl-5">
                  {offering.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold text-gray-800">Job Skill</h3>
          <p>{singleJob.jobSkill}</p>
        </footer>
      </div>
    </article>
  );
};

export default PostApplication;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "./Spinner.jsx";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 className="text-xl font-semibold text-gray-700">You have not posted any job!</h1>
      ) : (
        <div className="max-w-screen-lg mx-auto px-6 py-4">
          <h3 className="text-3xl font-semibold text-black mb-6">My Jobs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myJobs.map((element) => (
              <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-200 hover:scale-105 hover:shadow-xl" key={element._id}>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Job Title: </span>
                  {element.title}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Job Skill:</span> {element.jobSkill}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Budget: </span> {element.budget}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Location:</span> {element.location}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Job Type:</span> {element.jobType}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Business Owner Name:</span> {element.businessOwnerName}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Job Description:</span> {element.description}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Responsibilities:</span> {element.responsibilities}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Qualifications:</span> {element.qualifications}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Hiring Multiple Candidates?</span> {element.hiringMultipleCandidates}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Contact Email:</span> {element.contactInfo.email}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold text-slate-900">Contact Phone:</span> {element.contactInfo.phone}
                </p>
                
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300"
                  onClick={() => handleDeleteJob(element._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;

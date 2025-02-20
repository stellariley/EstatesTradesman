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
        <h1>You have not posted any job!</h1>
      ) : (
        <div className="account_components">
          <h3>My Jobs</h3>
          <div className="applications_container">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <p className="sub-sec">
                  <span>Job Title: </span>
                  {element.title}
                </p>
                <p className="sub-sec">
                  <span>Job Skill:</span> {element.jobSkill}
                </p>
                <p className="sub-sec">
                  <span>Budget: </span> {element.budget}
                </p>
                <p className="sub-sec">
                  <span>Location:</span> {element.location}
                </p>
                <p className="sub-sec">
                  <span>Job Type:</span> {element.jobType}
                </p>
                <p className="sub-sec">
                  <span>Business Owner Name:</span> {element.businessOwnerName}
                </p>
                <p className="sub-sec">
                  <span>Job Description:</span> {element.description}
                </p>
                <p className="sub-sec">
                  <span>Responsibilities:</span> {element.responsibilities}
                </p>
                <p className="sub-sec">
                  <span>Qualifications:</span> {element.qualifications}
                </p>
                <p className="sub-sec">
                  <span>Hiring Multiple Candidates?</span> {element.hiringMultipleTradesmen}
                </p>
                <p className="sub-sec">
                  <span>Contact Email:</span> {element.contactInfo.email}
                </p>
                <p className="sub-sec">
                  <span>Contact Phone:</span> {element.contactInfo.phone}
                </p>
                
                <button
                  className="btn"
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

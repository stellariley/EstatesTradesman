import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchBusinessOwnerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";

function Applications () {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchBusinessOwnerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1>You have no applications from Tradesmen.</h1>
      ) : (
        <div className="account_components">
          <h3>Applications For Your Posted Jobs</h3>
          <div className="applications_container">
            {applications.map((element) => (
              <div className="card" key={element._id}>
                <div>
                  <p className="sub-sec">
                    <span>Job Title: </span> {element.jobInfo.jobTitle}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Name: </span> {element.tradesmanInfo.name}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Email: </span> {element.tradesmanInfo.email}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Phone: </span> {element.tradesmanInfo.phone}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Address: </span> {element.tradesmanInfo.address}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Cover Letter: </span>
                    <textarea
                      value={element.tradesmanInfo.coverLetter}
                      rows={5}
                      disabled
                    ></textarea>
                  </p>
                </div>
                <div className="btn-wrapper">
                  <button
                    className="outline_btn"
                    onClick={() => handleDeleteApplication(element._id)}
                  >
                    Delete Application
                  </button>
                  <Link
                    to={
                      element.tradesmanInfo && 
                      element.tradesmanInfo.resume.url
                    }
                    className="btn"
                    target="_blank"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;

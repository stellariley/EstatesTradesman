import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchTradesmanApplications,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner.jsx";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTradesmanApplications());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length === 0 ? (
        <h1 className="text-xl font-semibold text-center">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="max-w-4xl mx-auto py-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">My Applications For Jobs</h3>
          {user && (
            <p className="text-center text-lg">
              <strong>Welcome, {user.name}!</strong>
              <br />
              <span>Role: {user.role}</span>
            </p>
          )}
          <div className="space-y-8">
            {applications.map((element) => {
              const { jobInfo, tradesmanInfo } = element;
              const { jobTitle } = jobInfo;
              const { name, email, phone, address, coverLetter, resume } = tradesmanInfo;

              return (
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300" key={element._id}>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Job Title: </span> {jobTitle}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Name: </span> {name}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Email: </span> {email}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Phone: </span> {phone}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Address: </span> {address}
                  </p>
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Coverletter: </span>
                    <textarea
                      className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                      value={coverLetter}
                      rows={5}
                      disabled
                    ></textarea>
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteApplication(element._id)}
                      aria-label="Delete Application"
                    >
                      Delete Application
                    </button>
                    {resume?.url && (
                      <Link
                        to={resume.url}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Resume"
                      >
                        View Resume
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyApplications;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchBusinessOwnerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
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
        <h1 className="text-center text-xl text-gray-700">You have no applications from Tradesmen.</h1>
      ) : (
        <div className="space-y-8 px-4 md:px-10">
          <h3 className="text-2xl font-semibold text-gray-900">Applications For Your Posted Jobs</h3>
          <div className="space-y-6">
            {applications.map((element) => (
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                key={element._id}
              >
                <p className="text-lg mb-2 text-gray-800">
                  <span className="font-semibold">Job Title: </span> {element.jobInfo.jobTitle}
                </p>
                <p className="text-lg mb-2 text-gray-800">
                  <span className="font-semibold">Applicant&apos;s Name: </span> {element.tradesmanInfo.name}
                </p>
                <p className="text-lg mb-2 text-gray-800">
                  <span className="font-semibold">Applicant&apos;s Email: </span> {element.tradesmanInfo.email}
                </p>
                <p className="text-lg mb-2 text-gray-800">
                  <span className="font-semibold">Applicant&apos;s Phone: </span> {element.tradesmanInfo.phone}
                </p>
                <p className="text-lg mb-2 text-gray-800">
                  <span className="font-semibold">Applicant&apos;s Address: </span> {element.tradesmanInfo.address}
                </p>
                <p className="text-lg mb-4 text-gray-800">
                  <span className="font-semibold">Applicant&apos;s Cover Letter: </span>
                  <textarea
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={element.tradesmanInfo.coverLetter}
                    rows={5}
                    disabled
                  ></textarea>
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleDeleteApplication(element._id)}
                  >
                    Delete Application
                  </button>
                  <Link
                    to={element.tradesmanInfo && element.tradesmanInfo.resume.url}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

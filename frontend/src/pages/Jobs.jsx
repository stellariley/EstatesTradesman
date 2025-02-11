import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner.jsx";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [skill, setSkill] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (state || city || skill || searchKeyword) {
      dispatch(fetchJobs(state, city, skill, searchKeyword));
    }
  }, [dispatch, error, state, city, skill, searchKeyword]);

  const handleStateChange = (selectedState) => {
    setState(selectedState);
    setCity(""); // Reset city when state changes
  };

  const handleSearch = () => {
    dispatch(fetchJobs(state, city, skill, searchKeyword));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const locations = {
    "California": ["Los Angeles", "San Diego", "San Francisco", "San Jose"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
    "Illinois": ["Chicago", "Aurora", "Naperville", "Springfield"],
    "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver"],
    "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
    "Georgia": ["Atlanta", "Savannah", "Augusta", "Macon"],
    "North Carolina": ["Charlotte", "Raleigh", "Durham", "Greensboro"],
    "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler"],
  };

  const skillsArray = [
    "All",
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search for jobs..."
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Find Job
              </button>
              <FaSearch className="text-gray-600" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>

              {/* State Selection */}
              <div className="mb-4">
                <h3 className="font-medium">Select State</h3>
                <select
                  value={state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All States</option>
                  {Object.keys(locations).map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
              <div className="mb-4">
                <h3 className="font-medium">Select City</h3>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Cities</option>
                  {state &&
                    locations[state].map((cityName) => (
                      <option key={cityName} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Skill Selection */}
              <div>
                <h3 className="font-medium">Select Skill</h3>
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Skills</option>
                  {skillsArray.map((skillName, index) => (
                    <option key={index} value={skillName}>
                      {skillName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Listings */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => {
                    return (
                      <div
                        className="bg-white p-6 rounded-lg shadow-lg"
                        key={element._id}
                      >
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="text-green-600 font-semibold mb-2">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="text-red-600 font-semibold mb-2">
                            Hiring
                          </p>
                        )}
                        <p className="text-lg font-semibold">{element.title}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {element.companyName}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {element.location}
                        </p>
                        <p className="font-medium text-gray-700 mb-2">
                          <span className="font-semibold">Budget:</span> ${element.budget}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          <span className="font-semibold">Posted On:</span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <Link
                          className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <img
                    src="./notfound.png"
                    alt="job-not-found"
                    className="w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;

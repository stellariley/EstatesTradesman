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
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search for jobs..."
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>

          <div className="wrapper">
            <div className="filter-bar">
              {/* State Selection */}
              <div className="filter-group">
                <h2>Select State</h2>
                <select value={state} onChange={(e) => handleStateChange(e.target.value)}>
                  <option value="">All States</option>
                  {Object.keys(locations).map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
              <div className="filter-group">
                <h2>Select City</h2>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state} // Disable if no state is selected
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
              <div className="filter-group">
                <h2>Select Skill</h2>
                <select value={skill} onChange={(e) => setSkill(e.target.value)}>
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
            <div className="container">
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => {
                    return (
                      <div className="card" key={element._id}>
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="hiring-multiple">Hiring Multiple Candidates</p>
                        ) : (
                          <p className="hiring">Hiring</p>
                        )}
                        <p className="title">{element.title}</p>
                        <p className="company">{element.companyName}</p>
                        <p className="location">{element.location}</p>
                        <p className="budget">
                          <span>Budget:</span> ${element.budget}
                        </p>
                        <p className="posted">
                          <span>Posted On:</span> {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="btn-wrapper">
                          <Link className="btn" to={`/post/application/${element._id}`}>
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <img src="./notfound.png" alt="job-not-found" style={{ width: "100%" }} />
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

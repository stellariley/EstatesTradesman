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

  // Fetch jobs based on filters or initial load
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }

    const fetchData = async () => {
      try {
        // Only fetch jobs when filters are applied or reset
        await dispatch(fetchJobs({ state, city, skill, searchKeyword }));
      } catch (err) {
        toast.error("Error fetching jobs");
      }
    };

    fetchData();
  }, [dispatch, state, city, skill, searchKeyword, error]); // Trigger re-fetch when filters change

  const handleStateChange = (selectedState) => {
    setState(selectedState);
    setCity(""); // Reset city when state changes
  };

  const handleSearch = () => {
    dispatch(fetchJobs({ state, city, skill, searchKeyword }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const location = {
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
    "Michigan": ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"],
    "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie"],
    "Virginia": ["Virginia Beach", "Norfolk", "Richmond", "Chesapeake"],
    "Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
    "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
    "Missouri": ["St. Louis", "Kansas City", "Springfield", "Columbia"],
    "Maryland": ["Baltimore", "Columbia", "Silver Spring", "Rockville"],
    "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
    "Minnesota": ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
    "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
    "Alabama": ["Birmingham", "Montgomery", "Huntsville", "Mobile"],
    "South Carolina": ["Charleston", "Columbia", "Greenville", "Spartanburg"],
    "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
    "Kentucky": ["Louisville", "Lexington", "Bowling Green", "Covington"],
    "Oregon": ["Portland", "Salem", "Eugene", "Gresham"],
    "Connecticut": ["Hartford", "New Haven", "Stamford", "Bridgeport"],
    "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
    "Nevada": ["Las Vegas", "Reno", "Henderson", "Sparks"],
    "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale"],
    "Utah": ["Salt Lake City", "Provo", "West Valley City", "Orem"],
    "Kansas": ["Wichita", "Overland Park", "Kansas City", "Olathe"],
    "New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho"],
    "Nebraska": ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
    "West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg"],
    "Idaho": ["Boise", "Nampa", "Meridian", "Idaho Falls"],
    "Hawaii": ["Honolulu", "Hilo", "Kailua", "Kaneohe"],
    "Maine": ["Portland", "Lewiston", "Bangor", "Auburn"],
    "New Hampshire": ["Manchester", "Nashua", "Concord", "Derry"],
    "Montana": ["Billings", "Missoula", "Bozeman", "Great Falls"],
    "Wyoming": ["Cheyenne", "Casper", "Laramie", "Gillette"],
    "Alaska": ["Anchorage", "Fairbanks", "Juneau", "Wasilla"],
    "Delaware": ["Wilmington", "Dover", "Newark", "Middletown"],
    "Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket"],
    "Vermont": ["Burlington", "Rutland", "Barre", "Montpelier"],
    "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot"],
    "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="wrapper">
            <div className="search-tab-wrapper">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search for jobs..."
              />
              <button onClick={handleSearch}>
                Find Job
              </button>
              <FaSearch />
            </div>
          </div>

          <div className="wrapper">
            <div className="filter-bar">
              <h2>Filter Jobs</h2>

              {/* State Selection */}
              <div className="cities">
                <h3>Select State</h3>
                <select
                  value={state}
                  onChange={(e) => handleStateChange(e.target.value)}
                >
                  <option value="">All States</option>
                  {Object.keys(location).map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
              <div className="cities">
                <h3>Select City</h3>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state}
                >
                  <option value="">All Cities</option>
                  {state &&
                    location[state].map((cityName) => (
                      <option key={cityName} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Skill Selection */}
              <div className="cities">
                <h3>Select Skill</h3>
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
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
            <div className="container">
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => {
                    const {
                      _id,
                      hiringMultipleTradesmen,
                      title,
                      businessOwnerName,
                      location,
                      description,
                      responsibilities,
                      qualifications,
                      budget,
                      jobSkill,
                      contactInfo,
                      jobPostedOn,
                    } = element;

                    return (
                      <div className="card" key={_id}>
                        {/* Hiring Status */}
                        <p className={`hiring-status ${hiringMultipleTradesmen === "Yes" ? "hiring-multiple" : "hiring"}`}>
                          {hiringMultipleTradesmen === "Yes" ? "Hiring Multiple Candidates" : "Hiring"}
                        </p>

                        {/* Job Title */}
                        <p className="title">{title}</p>

                        {/* Business Owner */}
                        <p className="businessOwner">{businessOwnerName}</p>

                        {/* Location */}
                        <p className="location">{location}</p>

                        {/* Description */}
                        <p className="description">
                          <span>Description: </span>{description}</p>

                        {/* Responsibilities */}
                        <p className="responsibilities">
                          <span>Responsibilities: </span>{responsibilities}</p>

                        {/* Qualifications */}
                        <p className="qualifications">
                        <span>Qualifications: </span>{qualifications}</p>

                        {/* Budget */}
                        <p className="budget">
                          <span>Budget:</span> ${budget}
                        </p>

                        {/* Job Skill */}
                        <p className="jobSkill">
                          <span>Job Skill:</span> {jobSkill}
                        </p>

                        {/* Contact Info */}
                        <p className="contact-info">
                          <span>Contact Info:</span><br />
                          Email: {contactInfo.email}<br />
                          Phone: {contactInfo.phone}
                        </p>

                        {/* Posted On */}
                        <p className="posted">
                          <span>Posted On:</span> {jobPostedOn ? jobPostedOn.substring(0, 10) : "N/A"}
                        </p>

                        {/* Apply Button */}
                        <div className="btn-wrapper">
                          <Link className="btn" to={`/post/application/${_id}`}>
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No jobs available at the moment.</p>
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

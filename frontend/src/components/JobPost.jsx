import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [budget, setBudget] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [jobSkill, setJobSkill] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [businessOwnerName, setBusinessOwnerName] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.jobs);

  const handlePostJob = () => {
    if (!title || !jobType || !city || !state || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const formData = {
      title,
      jobType,
      location: `${city}, ${state}`,
      description,
      responsibilities,
      qualifications,
      budget,
      hiringMultipleCandidates,
      jobSkill,
      contactInfo: { email: contactEmail, phone: contactPhone },
      businessOwnerName,
    };
  
    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
      
      // Reset form fields after successful job posting
      setTitle("");
      setJobType("");
      setState("");
      setCity("");
      setDescription("");
      setResponsibilities("");
      setQualifications("");
      setBudget("");
      setHiringMultipleCandidates("");
      setJobSkill("");
      setContactEmail("");
      setContactPhone("");
      setBusinessOwnerName("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h3 className="text-2xl font-semibold text-center">Post A Job</h3>

      <div className="space-y-4">
        <InputField label="Job Title" value={title} setValue={setTitle} />
        <SelectField
          label="Job Type"
          value={jobType}
          setValue={setJobType}
          options={["Full-time", "Part-time", "Contract"]}
        />
        <SelectField
          label="State"
          value={state}
          setValue={setState}
          options={Object.keys(location)}
        />
        <SelectField
          label="City"
          value={city}
          setValue={setCity}
          options={state ? location[state] : []}
          disabled={!state}
        />
        <InputField label="Business Owner Name" value={businessOwnerName} setValue={setBusinessOwnerName} />
        <TextareaField label="Job Description" value={description} setValue={setDescription} />
        <TextareaField label="Responsibilities" value={responsibilities} setValue={setResponsibilities} />
        <TextareaField label="Qualifications" value={qualifications} setValue={setQualifications} />
        <InputField label="Budget" value={budget} setValue={setBudget} />
        <SelectField
          label="Hiring Multiple Candidates?"
          value={hiringMultipleCandidates}
          setValue={setHiringMultipleCandidates}
          options={["Yes", "No"]}
        />
        <SelectField label="Job Skill" value={jobSkill} setValue={setJobSkill} options={skillsArray} />
        <InputField label="Contact Email" value={contactEmail} setValue={setContactEmail} />
        <InputField label="Contact Phone" value={contactPhone} setValue={setContactPhone} />
        
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            onClick={handlePostJob}
            disabled={loading}
          >
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, setValue }) => (
  <div>
    <label className="block text-lg font-medium mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      className="w-full p-3 border border-gray-300 rounded-md"
    />
  </div>
);

const TextareaField = ({ label, value, setValue }) => (
  <div>
    <label className="block text-lg font-medium mb-2">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      rows={5}
      className="w-full p-3 border border-gray-300 rounded-md"
    />
  </div>
);

const SelectField = ({ label, value, setValue, options, disabled = false }) => (
  <div>
    <label className="block text-lg font-medium mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md"
      disabled={disabled}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

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

export default JobPost;

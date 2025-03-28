import React from "react";
import Hero from "../components/Hero";
import TopSkills from "../components/Topskills.jsx";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <TopSkills />
      <HowItWorks />
    </div>
  );
};

export default Home;

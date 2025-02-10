import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How It Works</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Sign Up & Create Your Profile</h4>
          <p>
            Tradesmen and business owners can create a profile in minutes.
            Tradesmen showcase their skills, experience, and certifications,
            while business owners post job opportunities.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Post Jobs or Find Work</h4>
          <p>
            Business owners post job details, budgets, and timelines. Tradesmen
            browse job listings and apply for projects that match their skills
            and location.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Connect & Get Paid</h4>
          <p>
            Business owners hire qualified tradesmen, and projects are
            completed on time. Secure payments ensure tradesmen get paid fairly
            for their work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

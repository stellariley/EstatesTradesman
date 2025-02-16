import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How It Works</h3>
      <div className="container">
        {/* Step 1 */}
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Create Your Profile</h4>
          <p>
            Sign up for a free account, whether you're a tradesman or a business owner. Set up your profile to showcase your skills and experience, making it easier for clients and partners to find you.
          </p>
        </div>

        {/* Step 2 */}
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Find Jobs or Hire Professionals</h4>
          <p>
            Browse available job listings or post your own. We match you with the right people based on skills and needs, helping you find the best fit for the job.
          </p>
        </div>

        {/* Step 3 */}
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Complete the Work and Get Paid</h4>
          <p>
            Finish the project on time, and get paid securely through our platform. Business owners pay via escrow, ensuring fair payment once the job is done.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h3 className="text-3xl font-semibold text-gray-800 mb-12">How It Works</h3>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-300">
          <div className="text-4xl text-blue-600 mb-4">
            <LuUserPlus />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Create Your Profile</h4>
          <p className="text-gray-700">
            Easily set up your profile to showcase your skills, certifications, and experience. Start getting noticed by potential employers and clients.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-300">
          <div className="text-4xl text-green-600 mb-4">
            <VscTasklist />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Find Jobs or Hire</h4>
          <p className="text-gray-700">
            Browse job listings posted by business owners or post your own job requests. Get matched with tradesmen or contractors who meet your needs.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-300">
          <div className="text-4xl text-orange-600 mb-4">
            <BiSolidLike />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Work & Get Paid</h4>
          <p className="text-gray-700">
            Complete projects on time and ensure fair payment for your work. Business owners pay securely through escrow, ensuring timely payment upon completion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

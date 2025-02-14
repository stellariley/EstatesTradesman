import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-slate-300 text-gray-900 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
          Stay Busy. Get Paid. Build Your Reputation.
        </h1>

        {/* Subheading */}
        <h4 className="text-lg md:text-xl font-medium mb-8 text-gray-700">
          Connecting Skilled Tradesmen with Business Owners Who Need Quality Work.
        </h4>

        {/* Highlighted Section */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-800 p-8 rounded-xl shadow-xl">
          <p className="text-lg md:text-xl leading-relaxed text-white">
            Discover high-paying trade jobs from verified business owners. Whether you're an experienced professional or just starting out, our platform connects you with opportunities that match your skills. Showcase your expertise, build your reputation, and secure well-paying jobs with reliable clients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

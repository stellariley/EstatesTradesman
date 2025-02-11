import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-gray-700 to-indigo-800 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Stay Busy. Get Paid. Build Your Reputation.
      </h1>
      <h4 className="text-xl md:text-2xl font-medium mb-12 text-gray-300">
        Connecting Skilled Tradesmen with Business Owners Who Need Quality Work
      </h4>
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          Discover high-paying trade jobs from verified business owners. Whether you're an experienced professional or just starting out in your trade, our platform connects you to work opportunities that match your skillset. Showcase your qualifications, build your reputation, and establish long-term relationships with clients. Join today to get hired, get paid, and advance your career.
        </p>
      </div>
    </section>
  );
};

export default Hero;

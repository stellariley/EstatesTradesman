import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for might have been moved or does not exist.
        </p>
        <Link
          to={"/"}
          className="inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

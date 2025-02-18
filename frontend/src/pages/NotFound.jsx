import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notfound">
      <div className="content">
        <h1>!404 NOT FOUND!</h1>
        <p> The page you're looking for might have been moved or does not exist.
        </p>
        <Link to={"/"} className="btn">
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

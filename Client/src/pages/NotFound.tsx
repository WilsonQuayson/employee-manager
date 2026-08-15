import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Return to <Link to="/">home</Link>.
      </p>
    </div>
  );
};

export default NotFound;

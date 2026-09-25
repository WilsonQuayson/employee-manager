import React from "react";
import Breadcrumb from "../components/Breadcrumb";

const About: React.FC = () => {
  return (
    <div className="p-8">
      <Breadcrumb page="About" />
      <h1>About</h1>
      <p>This is a small demo app for managing employees.</p>
    </div>
  );
};

export default About;

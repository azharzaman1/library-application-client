import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../Generic/Heading";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <Heading type="secondary" className="text-secondaryText">
        Welcome to APS Library
      </Heading>
      <Heading className="mt-5 text-primary flex items-center space-x-2 md:space-x-4 text-shadow">
        <span>Read</span>
        <span> · </span>
        <span>Grow</span>
        <span> · </span>
        <span>Write</span>
      </Heading>
      <div className="homeHero__actions mt-7 md:mt-10 flex items-center space-x-2 md:space-x-4">
        <Link to="/books">
          <Button variant="contained">List of Books</Button>
        </Link>
        <Link to="/students">
          <Button variant="contained">List of Students</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

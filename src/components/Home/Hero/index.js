import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../Generic/Heading";
import useAuth from "../../../hooks/useAuth";

const Hero = () => {
  const currentUser = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <Heading type="secondary" className="text-secondaryText">
        Welcome to <span className="text-primary">MERN</span> Library
      </Heading>
      <Heading className="mt-5 text-primary flex items-center space-x-2 md:space-x-4 text-shadow">
        <span>Read</span>
        <span> · </span>
        <span>Grow</span>
        <span> · </span>
        <span>Write</span>
      </Heading>
      <div className="homeHero__actions mt-7 md:mt-10 flex items-center space-x-2 md:space-x-4">
        {currentUser ? (
          <>
            <Link to="/books">
              <Button variant="contained">Books</Button>
            </Link>
            <Link to="/students">
              <Button variant="contained">Students (Admin Only)</Button>
            </Link>
          </>
        ) : (
          <Link to="/auth/login">
            <Button variant="contained">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;

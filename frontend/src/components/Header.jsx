import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/sign-in">Sign In</Link>
    </>
  );
};

export default Header;

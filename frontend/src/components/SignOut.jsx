import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const signOutResponse = await axios.get(
        "http://localhost:3000/api/auth/signout",
        { withCredentials: true }
      );

      if (signOutResponse.data.success === true) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default SignOut;

// Protected.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/verifyUserToken",
          {
            withCredentials: true,
          }
        );

        if (!response.data.token) {
          navigate("/sign-up");
        }
      } catch (error) {
        navigate("/sign-in");
      }
    };

    verifyUser();
  }, [navigate]);

  return <Outlet />;
};

export default Protected;

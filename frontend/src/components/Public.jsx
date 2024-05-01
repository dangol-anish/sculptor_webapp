import React, { useEffect } from "react";
import axios from "axios";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";

const Public = () => {
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

        if (response.data.token) {
          navigate("/dashboard");
        }
      } catch (error) {}
    };

    verifyUser();
  }, [navigate]);

  return <Outlet />;
};

export default Public;

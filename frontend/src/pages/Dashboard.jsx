// Dashboard.jsx
import React from "react";
import SignOut from "../components/SignOut";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the protected area of your application.</p>
      <SignOut />
    </div>
  );
};

export default Dashboard;

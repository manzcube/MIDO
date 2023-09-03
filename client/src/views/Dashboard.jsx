import React from "react";
import GetStartedButton from "../components/Dashboard/GetStartedButton";
import DashboardText from "../components/Dashboard/DashboardText";
const Dashboard = () => {
  return (
    <div className="m-10 flex flex-col justify-start lg:px-52">
      <DashboardText />
      <GetStartedButton />
    </div>
  );
};

export default Dashboard;

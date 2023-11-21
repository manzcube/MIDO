import React from "react";
import GetStartedButton from "../components/Dashboard/GetStartedButton";
import DashboardText from "../components/Dashboard/DashboardText";

// Media
const capt = require("../images/capt.png");
const smallworkergrab = require("../images/small-worker.png");

const Dashboard = () => {
  return (
    <div className="m-10 flex flex-col justify-start lg:px-52">
      <img
        className="z-0 absolute top-60 right-64 rotate-[10deg] max-w-[10ch]"
        src={smallworkergrab}
        alt=""
      />
      <img
        className="-z-10 absolute max-w-[60ch] top-64 right-64 rotate-[17deg]"
        src={capt}
        alt=""
      />
      <DashboardText />
      <GetStartedButton />
    </div>
  );
};

export default Dashboard;

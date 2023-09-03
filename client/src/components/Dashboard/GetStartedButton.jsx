import React from "react";
import { Link } from "react-router-dom";

const GetStartedButton = () => {
  let token = localStorage.getItem("token");

  return (
    <div className="flex">
      <Link
        to={`/${token ? "today" : "login"}`}
        className="bg-sky-700 text-white text-xs p-3 my-6 rounded-lg flex items-center gap-2 hover:gap-5 transition-all duration-200"
      >
        Get Started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </Link>
    </div>
  );
};

export default GetStartedButton;

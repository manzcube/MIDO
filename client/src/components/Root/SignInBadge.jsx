import React from "react";
import "./RootComponents.css";
import { Jelly, Ring } from "@uiball/loaders";

const SignInBadge = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Ring speed={1.5} color="#0369A1" />
    </div>
  );
};

export default SignInBadge;

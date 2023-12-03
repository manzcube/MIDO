import React from "react";
import Input from "../Root/Input";
import SignInBadge from "../Root/SignInBadge";
import { Ring } from "@uiball/loaders";

const LoginForm = ({ onChange, onSubmit, inputProps, isLoading }) => {
  return inputProps.loading ? (
    <SignInBadge />
  ) : (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="text-center text-gray-700 font-bold">Welcome Back!</h1>
      <Input
        placeholder="Your email"
        type="email"
        label="Email"
        name="email"
        value={inputProps.email}
        onChange={onChange}
      />
      <Input
        label="Password"
        placeholder="Your password"
        type="password"
        name="password"
        value={inputProps.password}
        onChange={onChange}
      />
      <button className="p-1 py-3 bg-blue-500 text-white text-xs shadow-md rounded-md mt-3 hover:shadow-xl">
        {isLoading ? <Ring /> : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;

import React from "react";
import { useLoginMutation } from "../features/auth/authSlice";
import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/userSlice";

const Login = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Login, { isLoading }] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const canSubmit = [email, password].every(Boolean);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (canSubmit) {
        await Login(formData)
          .then((result) => {
            if (result.error) {
              setLoading(false);
              throw new Error(result.error.data);
            }
            if (result.data?.token) {
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("user", `${result.data.email}`);
              dispatch(setUser(result.data.email));
              navigate("/today");
              toast.success(`Welcome back ${result.data.name}`);
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      } else {
        toast.error("Fill the blanks please");
      }
    } catch (err) {
      toast.error(err.message);
      return;
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mt-44 flex justify-center items-center">
      {user && token ? (
        <div className="mt-50">
          <p className="mb-10">You're already signed in! {user}</p>
          <Link
            className="bg-blue-600 p-2 rounded text-xs text-white"
            to="/dashboard"
          >
            Go To Dashboard
          </Link>
        </div>
      ) : (
        <LoginForm
          onSubmit={onSubmit}
          onChange={onChange}
          isLoading={isLoading}
          setLoading={setLoading}
          inputProps={{ email, password, loading }}
        />
      )}
    </div>
  );
};

export default Login;

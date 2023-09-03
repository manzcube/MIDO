import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Endpoint
import { removeUser, setUser } from "../../features/auth/userSlice";
import { apiSlice } from "../../features/api/apiSlice";

const Navbar = () => {
  const userFromStorage = localStorage.getItem("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const user = useSelector((state) => state.user.user);
  const location = window.location.pathname.split("/")[1];

  useEffect(() => {
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }, [dispatch]);

  // Handle log out function
  const logout = () => {
    localStorage.clear();
    dispatch(apiSlice.util.resetApiState());
    dispatch(removeUser());
    navigate("/");
    toast.success("Logged out!");
  };

  const isCurrentlyHere = (fact) => {
    return fact ? "bg-white text-blue-500" : "";
  };

  return (
    <React.Fragment>
      <nav className="drop-shadow-md text-white bg-sky-700 text-xs w-full flex justify-between p-2 fixed top-0 z-20">
        <div className="ml-3 flex items-center">
          <Link to="/" className="decoration-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <span className="mx-3">{userFromStorage}</span>
        </div>
        <div className="mr-3 flex items-center">
          <div className="hidden md:flex">
            {userFromStorage ? (
              <>
                <Link
                  to="/"
                  className={`mx-3 my-auto p-1 rounded hover:bg-white hover:text-blue-500 transition-all duration-300 ${isCurrentlyHere(
                    location === ""
                  )}`}
                >
                  Home
                </Link>
                <Link
                  to="/today"
                  className={`mx-3 my-auto p-1 rounded hover:bg-white hover:text-blue-500 transition-all duration-300 ${isCurrentlyHere(
                    location === "today"
                  )}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/assets"
                  className={`mx-3 my-auto p-1 rounded hover:bg-white hover:text-blue-500 transition-all duration-300 ${isCurrentlyHere(
                    location === "assets"
                  )}`}
                >
                  Assets
                </Link>
              </>
            ) : (
              ""
            )}
            {user ? (
              <button
                onClick={logout}
                className="mx-3 my-auto p-1 rounded hover:bg-white hover:text-blue-500 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 mr-2 p-1 rounded hover:bg-white hover:text-blue-500 transition-all duration-300"
              >
                Log in
              </Link>
            )}
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:hidden active:scale-90"
              onClick={() => setDropDown(!dropDown)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`${
          dropDown ? "flex " : "hidden"
        } flex-col justify-around p-5 mt-10 fixed w-full bg-white text-blue-600 z-40 h-screen md:hidden`}
      >
        <Link
          to="/today"
          className="flex gap-2 p-10 rounded hover:bg-blue-300 hover:text-white"
        >
          Today
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
            />
          </svg>
        </Link>
        <Link
          to="/activities"
          className="flex gap-2 p-10 rounded hover:bg-blue-300 hover:text-white"
        >
          Activities
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            />
          </svg>
        </Link>
        <Link
          to="/workers"
          className="flex gap-2 p-10 rounded hover:bg-blue-300 hover:text-white"
        >
          Workers
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="flex gap-2 p-10 rounded hover:bg-blue-300 hover:text-white"
          >
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex gap-2 p-10 w-full text-end rounded hover:bg-blue-300 hover:text-white"
          >
            Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default Navbar;

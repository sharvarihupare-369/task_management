import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { logoutUser } from "../utils/http";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ onCreateTaskClick }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const handleLogout = async () => {
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    const data = await logoutUser(token);
    if (data === "User loggeded Out successfully") {
      toast.success(data);
      localStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      toast.error(data);
    }
  };

  return (
    <>
      <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Task Manager
        </Link>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={onCreateTaskClick}
          >
            <FaPlus className="mr-2" />
          </button>
          {token && (
            <button
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Navbar;

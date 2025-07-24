import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/userAtom";
import { useNavigate, Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import Spinner from "./Spinner.jsx"; // adjust if path is different
import API from "../utils/api"

function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const res = await API.get("/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (error) {
        console.error("User verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    updateUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserData(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">TaskTracker</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <Link
                to="/"
                className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/analytics"
                className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Analytics
              </Link>
              {user?.role !== "user" && (
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button
                className="block px-4 py-2 text-blue-500 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/analytics" className="text-white hover:text-gray-200">
            Analytics
          </Link>
          {user?.role !== "user" && (
            <Link to="/dashboard" className="text-white hover:text-gray-200">
              Dashboard
            </Link>
          )}
          <button
            className="flex items-center text-white hover:text-gray-200"
            onClick={handleLogout}
          >
            <span className="mr-1">Logout</span>
            <MdLogout size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;


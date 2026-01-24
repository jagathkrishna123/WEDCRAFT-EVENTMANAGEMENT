import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import searchicon from "../assets/search.svg";
import menuicon from "../assets/menuicon.svg";
import { BsPerson } from "react-icons/bs";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate } = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4  bg-transparent absolute  top-0 left-0 right-0 z-50">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <p className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent text-3xl font-bold">
          WedCraft
        </p>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-gray-200">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/allevents">All Events</NavLink>
        {user && (
          <>
            <NavLink to="/user-dashboard">Dashboard</NavLink>
            <NavLink to="/allevents">All Bookings</NavLink>
          </>
        )}
        {/* search event */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-200"
            type="text"
            placeholder="Search Event"
          />
          <img src={searchicon} alt="" />
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-indigo-400 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            {/* Avatar */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="border-2 border-blue-900 rounded-full p-1 bg-blue-900 cursor-pointer"
            >
              <BsPerson className="text-white text-xl" />
            </div>

            {/* Dropdown */}
            {menuOpen && (
              <ul className="absolute top-10 right-0 bg-white shadow border border-gray-400 py-2.5 w-40 rounded-md text-sm z-50">
                <li
                  onClick={() => {
                    navigate("/user-dashboard");
                    setMenuOpen(false);
                  }}
                  className="p-1.5 pl-3 hover:bg-blue-400 cursor-pointer"
                >
                  Dashboard
                </li>
                <li
                  onClick={() => {
                    navigate("/myprofile");
                    setMenuOpen(false);
                  }}
                  className="p-1.5 pl-3 hover:bg-blue-400 cursor-pointer"
                >
                  My profile
                </li>
                <li
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="p-1.5 pl-3 hover:bg-blue-400 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={menuicon} alt="" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`
    fixed top-0 left-0 h-screen w-[260px] z-50 bg-white shadow-xl
    flex flex-col items-start gap-6 p-6
    md:hidden
    transition-transform duration-300 ease-in-out
    transform
    ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
  `}
      >
        <NavLink
          onClick={() => setOpen(false)}
          to="/"
          className="text-gray-800 hover:text-indigo-600"
        >
          Home
        </NavLink>

        <NavLink
          onClick={() => setOpen(false)}
          to="/about"
          className="text-gray-800 hover:text-indigo-600"
        >
          About
        </NavLink>

        <NavLink
          onClick={() => setOpen(false)}
          to="/contact"
          className="text-gray-800 hover:text-indigo-600"
        >
          Contact
        </NavLink>

        <NavLink
          onClick={() => setOpen(false)}
          to="/allevents"
          className="text-gray-800 hover:text-indigo-600"
        >
          All Events
        </NavLink>

        {user && (
          <NavLink
            onClick={() => setOpen(false)}
            to="/user-dashboard"
            className="text-gray-800 hover:text-indigo-600"
          >
            Dashboard
          </NavLink>
        )}

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <>
            <NavLink
              onClick={() => setOpen(false)}
              to="/myprofile"
              className="text-gray-800 hover:text-indigo-600"
            >
              My Profile
            </NavLink>
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

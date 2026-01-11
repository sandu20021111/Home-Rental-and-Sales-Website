import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

/* Booking Icon */
const BookingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 12h-5" />
    <path d="M15 8h-5" />
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
  </svg>
);

const Header = () => {
  const [active, setActive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* Clerk hooks */
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setActive(window.scrollY > 10);
      } else {
        setActive(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  /* Prevent flicker while Clerk loads */
  if (!isLoaded) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        active ? "bg-white shadow-md py-3" : "py-5"
      }`}
    >
      <div className="max-padd-container">
        <div className="flexBetween">
          {/* Logo */}
          <Link to="/">
            <img
              src={assets.logoImg}
              alt="Logo"
              className={`${!active ? "invert" : ""} h-11`}
            />
          </Link>

          {/* Navbar */}
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyle={`
              ${
                menuOpened
                  ? "flex flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 rounded-xl"
                  : "hidden lg:flex gap-x-4"
              }
              ${!menuOpened && !active ? "text-white" : "text-black"}
            `}
          />

          {/* Right Side */}
          <div className="flex items-center gap-x-4">
            {/* Mobile menu icon */}
            <img
              src={menuOpened ? assets.close : assets.menu}
              alt="menu"
              onClick={toggleMenu}
              className={`${!active ? "invert" : ""} lg:hidden cursor-pointer`}
            />

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* My Bookings button */}
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="btn-secondary flexCenter gap-2 rounded-full"
                >
                  <BookingIcon />
                  My Bookings
                </button>

                {/* User menu */}
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <button
                onClick={openSignIn}
                className="btn-secondary flexCenter gap-2 rounded-full"
              >
                Login
                <img src={assets.user} alt="user" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

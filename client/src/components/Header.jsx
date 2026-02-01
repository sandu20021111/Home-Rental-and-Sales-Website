import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";
import { useAppContext } from "../context/AppContext";
import { useClerk,UserButton } from "@clerk/clerk-react";

const Header = () => {
  const [active, setactive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const{navigate,user,isOwner,setshowAgencyReg}=useAppContext();
  const{openSignIn}= useClerk();

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setactive(window.scrollY > 10);
      } else {
        setactive(true);
      }
      if (window.scrollY > 10) {
        setShowSearch(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <header
      className={`${
        active ? "bg-white shadow-md py-3" : "py-5"
      } fixed top-0 w-full z-50 left-0 right-0 transition-all duration-200`}
    >
      <div className="max-padd-container">
        {/*container  */}
        <div className="flexBetween">
          {/* logo  */}
          <div className="flex flex-1">
            <Link to={"/"}>
              <img
                src={assets.logoImg}
                alt="LogoImg"
                className={`${!active && "invert"} h-11`}
              />
            </Link>
          </div>
          {/* nav  */}
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyle={`${
              menuOpened
                ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded-xl z-50"
                : "hidden lg:flex gap-x-s xl:gap-x-1 meduim-15 p-1"
            } ${!menuOpened && !active ? "text-white" : "text-black"}`}
          />
          {/* Left side (buttons, searchbar & profile) */}
          <div className="flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8">
                <div>
                   {user &&(
                    <button onClick={()=>isOwner ? navigate('/owner'):setshowAgencyReg(true)}
                    className={`btn-outline px-2 py-1 text-xs font-semibold ${!active && 'text-primary  ring-primary bg-transparent hover:text-black'} bg-secondary/10 hover:bg-white`}>
                    
                       {isOwner ? "Dashboard":"Register Agency"}
                    </button>
                   )}
                </div>

            {/* Search bar  */}
            <div className="relative hidden xl:flex items-center">
              <div
                className={`${
                  active ? "bg-secondary/10" : "bg-white"
                } transition-all duration-300 ease-in-out ring-1 ring-slate-900/10 rounded-full overflow-hidden ${
                  showSearch
                    ? "w-[266px] opacity-100 px-4 py-2"
                    : "w-11 opacity-0 px-0 py-0"
                } `}
              >
                <input
                  type="text"
                  placeholder="Search for location..."
                  className="w-full text-sm outline-none pr-10 placeholder:text-gray-400"
                />
              </div>
              <div
                className={`${
                  active ? "bg-secondary/10" : "bg-primary"
                } ring-1  ring-slate-900/10 p-[8px] rounded-full absolute right-0 z-10 cursor-pointer`}
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <img src={assets.search} alt="searchIcon" />
              </div>
            </div>
            {/* menu toggle  */}
            <>
              {menuOpened ? (
                <img
                  src={assets.close}
                  alt="closeMenuIcon"
                  onClick={toggleMenu}
                  className={`${
                    !active && "invert"
                  } lg:hidden cursor-pointer text:xl`}
                />
              ) : (
                <img
                  src={assets.menu}
                  alt="openMenuIcon"
                  onClick={toggleMenu}
                  className={`${
                    !active && "invert"
                  } lg:hidden cursor-pointer text-xl`}
                />
              )}
            </>
            {/*user profile*/}
            <div>
              {/*user*/}
              <div>
                <div>
                  <button className="btn-secondary flexCenter gap-2 rounded-full">
                    Login
                    <img src={assets.user} alt="userIcon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
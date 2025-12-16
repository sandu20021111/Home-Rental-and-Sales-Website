import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ setMenuOpened, containerStyle }) => {
  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/listing", title: "Listing" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title: "Contact" },
  ];

  return (
    <nav className={containerStyle}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          onClick={() => {
            setMenuOpened(false);
            window.scrollTo(0, 0);
          }}
          className={({ isActive }) =>
            `${
              isActive ? "active-link" : ""
            } px-3 py-2 rounded-full uppercase text-sm font-bold`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;

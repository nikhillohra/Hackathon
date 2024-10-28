import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[64px] bg-white flex items-center justify-between shadow-sm z-50">
      {/* LOGO & NAME */}
      <Link to="/">
        <div className="flex items-center p-4 sm:ml-10">
          <img src="./AILogo.webp" alt="Logo" width={110} height={110} />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="h-[64px] bg-white flex items-center justify-between shadow-sm">
        {/* LOGO & NAME */}
        <Link to="/">
          <div className=" flex items-center p-4 sm:ml-10">
            <img src="./AILogo.webp" alt="" width={110} height={110} />
          </div>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;

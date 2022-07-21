import React from "react";

const Navbar = ({ executeScroll }) => {
  return (
    <div className="navbar-wrapper flex items-center justify-between px-20 pt-7 ">
      <div className="w-100 text-black font-semibold text-2xl tracking-wider">
        Smart Credit.
      </div>
      <button
        onClick={executeScroll}
        className="bankpdfbutton p-3 tracking-wider text-black rounded-lg hover:bg-black hover:text-white"
      >
        Try for Free
      </button>
    </div>
  );
};

export default Navbar;

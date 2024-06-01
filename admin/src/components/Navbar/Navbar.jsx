import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img className="logo" src={assets.newLogo} alt="" />
        <img className="profile" src={assets.profile_image} alt="" />
      </div>
      <hr />
    </>
  );
};

export default Navbar;

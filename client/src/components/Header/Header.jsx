import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/adminlogo.png";

const Header = ({ adminName }) => {
  return (
    <header>
      <img src={logo} alt=""></img>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/employees">Employee List</Link>
        <span>{adminName}</span>
        <Link to="/">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;

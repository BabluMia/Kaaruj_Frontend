import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SingleNav = ({ name, icon: Icon, to, toggle, SetCollapseState, CollapseState }) => {
  const location = useLocation();
  // const is_open = localStorage.getItem("open").toString();
  const [is_open, Setis_open] = useState(0);
  const HandleClickDropdown = () => {
    SetCollapseState({
      Inventory: false,
      Sales: false,
      User: false,
      Reports: false,
    });
  };
  useEffect(() => {
    Setis_open(toggle);
  }, [toggle]);
  return (
    <Link onClick={HandleClickDropdown} to={to} className={`nav__link  ${location.pathname === to && "active__menu"}  ${!is_open ? "reduce_width" : ""}`}>
      <Icon className={`${location.pathname === to ? "active__menu_nav__icon" : "nav__icon"}`} size={24} />
      {is_open && <span className={`${location.pathname === to ? "active__menu_nav__name" : "nav__name"}`}>{name}</span>}{" "}
    </Link>
  );
};

export default SingleNav;

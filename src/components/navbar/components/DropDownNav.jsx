import { CaretRight, Cube, HouseLine, ShoppingCart } from "phosphor-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Sublink from "./Sublink";

const DropDownNav = ({ name, icon: Icon, sublinks, toggle, SetCollapseState, CollapseState }) => {
  // const [collapse, setCollapse] = useState(0);
  const [active, setactive] = useState(false);
  const location = useLocation();
  const [is_open, Setis_open] = useState(0);
  const collapse = CollapseState !== undefined && CollapseState[name];
  useEffect(() => {
    Setis_open(toggle);
  }, [toggle]);
  useEffect(() => {
    const sublink_to = sublinks.map((curr) => curr.to);
    for (let index = 0; index < sublink_to.length; index++) {
      const curr = sublink_to[index];
      if (curr === location.pathname) {
        setactive(true);
        break;
      } else {
        setactive(false);
      }
    }
  }, [location]);

  const HandleClickDropdown = () => {
    SetCollapseState({
      Inventory: name !== "Inventory" ? false : !CollapseState[name],
      Sales: name !== "Sales" ? false : !CollapseState[name],
      User: name !== "User" ? false : !CollapseState[name],
      Reports: name !== "Reports" ? false : !CollapseState[name],
      Customers: name !== "Customers" ? false : !CollapseState[name],
    });
  };


  return (
    <div className={`dropdown_container `}>
      <div className={`nav__link Nav_collapse   ${active && "active__menu"} ${!is_open ? "reduce_width" : ""} `} onClick={HandleClickDropdown}>
        <Icon className={`${active ? "active__menu_nav__icon" : "nav__icon"}`} size={24} />
        {is_open && <span className={`${active ? "active__menu_nav__name" : "nav__name"}`}>{name}</span>}
        <CaretRight className={`collapse__link  ${active ? "active__down_arrow" : "down_arrow"} ${collapse && "rotate"}`} />
      </div>
      <ul className={`collapse__menu drop_down ${collapse && "showCollapse"}`}>
        {sublinks.map((current) => {
          // current.to === location.pathname && location.pathname!=="" && !active&& setactive(true);
          return (
            <>
              <Sublink to={current.to} data={current.name} />
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownNav;

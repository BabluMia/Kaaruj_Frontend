import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useHistory } from "react-router-dom";
import Sublink from "./components/Sublink";
import "./css/sideNav.css";

import Header from "./components/header/Header";
import RoutesFile from "../Routes/RoutesFile";
import DropDownNav from "./components/DropDownNav";
import SingleNav from "./components/SingleNav";
import { Navbar_items } from "./NavbarItems";
import { ArrowCircleRight, Power } from "phosphor-react";
import { useEffect } from "react";
import SideComponent from "./components/SideComponent/SideComponent";
import Notification_sm from "./components/small_Notfication/Notification_sm";
import { useRef } from "react";
import Profile from "./components/header/Profile";
import { showToast } from "../../utils/ToastHelper";
import { BASE_URL } from "../Const/Url";
import axios from "axios";

const SideNav = () => {
  // for nav dropdown
  const [Inventory, setInventory] = useState("Inventory");
  const [User, setUser] = useState("User");
  const [Sales, setSales] = useState("Sales");
  // for nav dropdown
  const [navbarWIdth, setnavbarWIdth] = useState(1);
  const [Shownotification, SetShownotification] = useState(0);
  const [showUser, SetShowUser] = useState(1);
  const [arrow, setArrow] = useState(true);
  const ToggleNav = () => {
    setnavbarWIdth(!navbarWIdth);
  };
  const [HideNav, SetHideNav] = useState(0);
  const [CollapseState, SetCollapseState] = useState({
    Inventory: false,
    Sales: false,
    User: false,
    Reports: false,
    Customers:false
  });

  const imgNotif = useRef();
  const userNotif = useRef();
  const userNotif2 = useRef();
  const userNotif3 = useRef();
  const inventory = useRef();
  const sales = useRef();
  const user = useRef();

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (width < 900) {
      setnavbarWIdth(0);
    } else {
      setnavbarWIdth(1);
    }
  }, [width]);

  const HandleNotificationClick = () => {
    SetShownotification((prev) => !prev);
  };
  const HandleShowUser = () => {
    SetShowUser((prev) => !prev);
    setArrow((prev) => !prev);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      e.path !== undefined &&
        e.path[0] !== imgNotif.current &&
        SetShownotification(0);
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);
  useEffect(() => {
    const closeUser = (e) => {
      e.path !== undefined && e.path[0] !== userNotif.current && SetShowUser(1);
      e.path !== undefined && e.path[0] !== userNotif.current && setArrow(true);
    };
    document.body.addEventListener("click", closeUser);
    return () => document.body.removeEventListener("click", closeUser);
  }, []);
  // =====================

  const [notificationList, setNotificationList] = useState([]);
  const getNotification = () => {
    const url = `${BASE_URL}api/v1/users/notifications/`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data.results);
        const result = res.data.data.results;
        setNotificationList(result);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  // useEffect(() => {
  //   getNotification();

  // }, []);
  // =====================

  const history = useHistory();
  const logout_func = () => {
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    showToast("success", "Logged Out Successfully");

    history.push("/login");
  };
  return (
    <>
      <div className="mainContainer">
        {!HideNav && (
          <Header
            imgRef={imgNotif}
            navbarWIdth={navbarWIdth}
            onBurgerClick={ToggleNav}
            HandleNotificationClick={HandleNotificationClick}
            userNotif={userNotif}
            getNotification={getNotification}
            HandleShowUser={HandleShowUser}
            arrow={arrow}
          />
        )}
        <div
          id="body-pd"
          className={`${!HideNav & navbarWIdth ? "body-pd" : ""}`}
        >
          <div
            className={` ${!HideNav ? "l-navbar" : "hide-navbar"} ${
              !HideNav & navbarWIdth ? "expander" : ""
            }`}
            id="navbar"
          >
            <nav className="nav">
              <div>
                <div className="nav__brand"></div>
                <div className="nav__list mt-3">
                  <SingleNav
                    SetCollapseState={SetCollapseState}
                    CollapseState={CollapseState}
                    toggle={navbarWIdth}
                    to={Navbar_items["Dashboard"].to}
                    name={"Dashboard"}
                    icon={Navbar_items["Dashboard"].icon}
                  />

                  <DropDownNav
                    toggle={navbarWIdth}
                    name="Inventory"
                    icon={Navbar_items["Inventory"].icon}
                    sublinks={Navbar_items["Inventory"].sublinks}
                    sendName={"Inventory"}
                    ref={inventory}
                    SetCollapseState={SetCollapseState}
                    CollapseState={CollapseState}
                  />
                  <DropDownNav
                    toggle={navbarWIdth}
                    name="Sales"
                    icon={Navbar_items["Sales"].icon}
                    sublinks={Navbar_items["Sales"].sublinks}
                    sendName={"Sales"}
                    ref={sales}
                    CollapseState={CollapseState}
                    SetCollapseState={SetCollapseState}
                  />

                  <DropDownNav
                    toggle={navbarWIdth}
                    name="Customers"
                    icon={Navbar_items["Customers"].icon}
                    sublinks={Navbar_items["Customers"].sublinks}
                    CollapseState={CollapseState}
                    SetCollapseState={SetCollapseState}
                  />

                  {/* <SingleNav
                    SetCollapseState={SetCollapseState}
                    CollapseState={CollapseState}
                    toggle={navbarWIdth}
                    to={Navbar_items["Customers"].to}
                    name={"Customers"}
                    icon={Navbar_items["Customers"].icon}
                  /> */}

                  <SingleNav
                    SetCollapseState={SetCollapseState}
                    CollapseState={CollapseState}
                    toggle={navbarWIdth}
                    to={Navbar_items["Notification"].to}
                    name={"Notification"}
                    icon={Navbar_items["Notification"].icon}
                  />

                  <DropDownNav
                    toggle={navbarWIdth}
                    name="User"
                    icon={Navbar_items["User"].icon}
                    sublinks={Navbar_items["User"].sublinks}
                    CollapseState={CollapseState}
                    SetCollapseState={SetCollapseState}
                  />
                  <DropDownNav
                    toggle={navbarWIdth}
                    name="Reports"
                    icon={Navbar_items["Reports"].icon}
                    sublinks={Navbar_items["Reports"].sublinks}
                    sendName={"Reports"}
                    // ref={user}
                    CollapseState={CollapseState}
                    SetCollapseState={SetCollapseState}
                  />
                  {/* <SingleNav
                    SetCollapseState={SetCollapseState}
                    CollapseState={CollapseState}
                    toggle={navbarWIdth}
                    to={Navbar_items["Reports"].to}
                    name={"Reports"}
                    icon={Navbar_items["Reports"].icon}
                  /> */}
                </div>
              </div>

              <div onClick={logout_func} to="#" className="logout_nav__link">
                <Power className="logout__nav__icon" size={24} />
                {navbarWIdth && (
                  <span className="logout__nav__name">Log Out</span>
                )}
              </div>
            </nav>
          </div>
          <div className={`${!HideNav && "OtherComponents"} `}>
            {/* <div className={`OtherComponents ${navbarWIdth&&"blur_background"}`}></div> */}
            <Notification_sm
              notificationList={notificationList}
              show={Shownotification}
            />
            {!showUser && <Profile />}
            <SideComponent HideNav={HideNav} setHideToolbar={SetHideNav} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;

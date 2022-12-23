import React from "react";
import bars from "./Icon/Menu Icon.svg";
import search from "./Icon/Search Icon.svg";
import notification from "./Icon/notification Fill Icon.svg";
import line from "./Icon/Line 45.svg";
import profile from "./Icon/Profile Picture.svg";
import downArrow from "./Icon/d-arow.svg";
import "./Header.css";
import { useState } from "react";
import { useEffect } from "react";
import { MagnifyingGlass } from "phosphor-react";
import logo1 from "../../../../assets/Icon/Logo 1.svg";
import logo2 from "../../../../assets/Icon/logo2.svg";
import logo3 from "../../../../assets/Icon/11.png";
import logo4 from "../../../../assets/Icon/KAARUJ 2.png";
import Profile from "./Profile";
import { useHistory } from "react-router-dom";
import * as path from "../../../Routes/RoutePaths";
import { BASE_URL } from "../../../Const/Url";
import axios from "axios";

const Header = ({
  onBurgerClick,
  HandleNotificationClick,
  imgRef,
  navbarWIdth,
  HandleShowUser,
  userNotif,
  getNotification,
  arrow,
}) => {
  const [Search, setSearch] = useState(true);
  // const arrowChange = () => {
  //   if (arrow) {
  //     setArrow(false);
  //   } else {
  //     setArrow(true);
  //   }
  // };
  const history = useHistory();

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
    // console.log(width);
    if (width < 600) {
      console.log("less");
      setSearch(false);
    } else {
      setSearch(true);
    }
  }, [width]);

  const userProfile = JSON.parse(window.localStorage.getItem("userData"));
  // console.log(userProfile);
  const [userData, setUserData] = useState({});
  const getUser = () => {
    const url = `${BASE_URL}api/v1/auth/profile/`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data);
        // console.log(res.data.data.results);
        const result = res.data.data;
        setUserData(result);
        // console.log(userData,'-------------')
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const callNotification=()=>{
    HandleNotificationClick()
     getNotification()
  }

  return (
    <div className="profile-rel">
      <div className="header_container ">
        <div
          className="bg-black d-flex align-items-center justify-content-between header-main"
          style={{ height: "80px" }}
        >
          <div className="d-flex ">
            {/* <h2 className="text-white mt-1">LOGO</h2> */}
            {navbarWIdth && (
              <img
                className="my-auto pointer"
                style={{ width: "120px" }}
                src={logo3}
                onClick={() => history.push(path.dasshboard)}
                alt=""
              />
            )}
            {!navbarWIdth && (
              <img
                height={46}
                style={{ width: "35px", height: "45px" }}
                className="logo-m pointer"
                src={logo4}
                onClick={() => history.push(path.dasshboard)}
                alt=""
              />
            )}
            <div
              className={`${navbarWIdth ? "bars" : "bars2"}`}
              onClick={onBurgerClick}
              style={{ cursor: "pointer" }}
            >
              <img width={48} height={48} src={bars} alt="" />
            </div>

            <div class="search-bar search d-none">
              <MagnifyingGlass size={32} />

              <input
                id="search-input"
                title="Search for transaction, Item, etc"
                aria-label="Search for an icon"
                type="text"
                autocapitalize="none"
                autocomplete="off"
                placeholder="Search for transaction, Item, etc"
              />
            </div>
            <div className="search_bar_small">
              <MagnifyingGlass size={32} />
            </div>
          </div>
          <div className="d-flex profile align-items-center">
            <img
              src={notification}
              onClick={() => callNotification()}
              ref={imgRef}
              className="navNotification"
              style={{ cursor: "pointer" }}
              alt=""
            />

            <img className=" navLine" src={line} alt="" />
            <div></div>
            {/* ------------------ */}
            <div className="user-box-parent">
              <div className="user-box-child" ref={userNotif}
                  onClick={HandleShowUser}></div>
              <div
                className="d-flex justify-content-center align-items-center pointer"
                style={{ zIndex: "0" }}
              >
                <img
                  className="navProfile"
                  style={{
                    cursor: "pointer",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                  }}
                  src={
                    userData?.image ? `${BASE_URL}${userData?.image} ` : profile
                  }
                  // src={userProfile?.image ? userProfile?.image : profile}
                  alt=""
                />

                <div className="text-white mt-3 name_nav">
                  <span className="mt-2">
                    {userData?.first_name} {userData?.last_name}
                  </span>
                  <p>
                    {userProfile?.role !== "" ? userProfile?.role : "Admin"}
                  </p>
                </div>
                <div
                  style={{ cursor: "pointer ", zIndex: "2000" }}
                  
                >
                  <img
                    className={`${arrow === true && "rotate-img"} m-4`}
                    style={{ transition: ".5s all ease" }}
                    src={downArrow}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

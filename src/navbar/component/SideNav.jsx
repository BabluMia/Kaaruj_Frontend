import React, { useState, useEffect } from "react";
import "./SideNav.css";
// import logo from "../../assets/image/logo.png";
// import smallLogo from "../../assets/image/smallLogo.png";

import QHI_LOGO from "../../asstes/psImg/logo.svg";
import QHI_MEDIA_Black from "../../asstes/psImg/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useLocation } from "react-router-dom";

const SideNav = ({ menuCollapse }) => {
  const location = useLocation();
  const currentRoute = useHistory().location.pathname.toLowerCase();
  const [menu, setMenu] = useState(menuCollapse);
  const [activeNav, setActiveNave] = useState(location.pathname);
  const handleMenu = () => setMenu(menuCollapse);

  console.log("menu", menu);
  useEffect(() => {
    setMenu(menuCollapse);
  }, [menuCollapse]);

  useEffect(() => {
    setActiveNave(location.pathname);
  }, [location.pathname]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const shootid = localStorage.getItem("shootid");

  return (
    <>
      <div className="sidebar">
        <ProSidebar collapsed={menu}>
          <SidebarHeader>
            <div className="logo ">
              {menu ? (
                <img src={QHI_LOGO} alt="" style={{ height: "48px", width: "48px" }} />
              ) : (
                <img
                  src={QHI_MEDIA_Black}
                  alt=""
                  style={{
                    width: " 186px",
                    height: "49px",
                    paddingBottom: "0",
                  }}
                />
              )}
            </div>
          </SidebarHeader>
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <Menu iconShape="square">
                {menu ? (
                  <MenuItem
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22" fill="#AEAEB2" />
                      </svg>
                    }
                  >
                    {" "}
                    <NavLink className={currentRoute.includes("dashboard") ? "MenuItem active" : "MenuItem"} active exact to="/home">
                      Home
                    </NavLink>
                  </MenuItem>
                ) : (
                  <MenuItem
                    active={activeNav === "/home" || activeNav === `/preview` ? true : false}
                    onClick={() => setActiveNave("/home", `/preview`)}
                    icon={
                      activeNav === "/home" || activeNav === `/preview` ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22" fill="#AEAEB2" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22" fill="#AEAEB2" />
                        </svg>
                      )
                    }
                  >
                    {" "}
                    <NavLink exact to="/home">
                      Home
                    </NavLink>
                  </MenuItem>
                )}

                {menu ? (
                  <MenuItem
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14.8 3H9.2C8.43 3 7.8 3.675 7.8 4.5V16.5C7.8 17.325 8.43 18 9.2 18H17.6C18.37 18 19 17.325 19 16.5V7.5L14.8 3ZM17.6 16.5H9.2V4.5H14.1V8.25H17.6V16.5ZM6.4 6V19.5H17.6V21H6.4C5.63 21 5 20.325 5 19.5V6H6.4ZM10.6 10.5V12H16.2V10.5H10.6ZM10.6 13.5V15H14.1V13.5H10.6Z"
                          fill="#AEAEB2"
                        />
                      </svg>
                    }
                  >
                    {" "}
                    <NavLink exact to="application">
                      All Application
                    </NavLink>
                  </MenuItem>
                ) : (
                  <MenuItem
                    className="active_button"
                    active={activeNav == `/application` || activeNav == `/upload` ? true : false}
                    onClick={() => setActiveNave(`/application`, `/upload`)}
                    icon={
                      activeNav == `/application` || activeNav == `/upload` ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14.8 3H9.2C8.43 3 7.8 3.675 7.8 4.5V16.5C7.8 17.325 8.43 18 9.2 18H17.6C18.37 18 19 17.325 19 16.5V7.5L14.8 3ZM17.6 16.5H9.2V4.5H14.1V8.25H17.6V16.5ZM6.4 6V19.5H17.6V21H6.4C5.63 21 5 20.325 5 19.5V6H6.4ZM10.6 10.5V12H16.2V10.5H10.6ZM10.6 13.5V15H14.1V13.5H10.6Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14.8 3H9.2C8.43 3 7.8 3.675 7.8 4.5V16.5C7.8 17.325 8.43 18 9.2 18H17.6C18.37 18 19 17.325 19 16.5V7.5L14.8 3ZM17.6 16.5H9.2V4.5H14.1V8.25H17.6V16.5ZM6.4 6V19.5H17.6V21H6.4C5.63 21 5 20.325 5 19.5V6H6.4ZM10.6 10.5V12H16.2V10.5H10.6ZM10.6 13.5V15H14.1V13.5H10.6Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      )
                    }
                  >
                    {" "}
                    <NavLink exact to="/application">
                      All Application
                    </NavLink>
                  </MenuItem>
                )}
                {menu ? (
                  <MenuItem
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.7359 4H6.54719C6.13685 4 5.74332 4.16747 5.45316 4.46556C5.16301 4.76366 5 5.16796 5 5.58953V18.3058C5 18.7273 5.16301 19.1316 5.45316 19.4297C5.74332 19.7278 6.13685 19.8953 6.54719 19.8953H11.9624C11.6452 19.6966 11.3435 19.4502 11.0805 19.18C10.8252 18.9177 10.6086 18.6237 10.4152 18.3058H6.54719V5.58953H11.9624V9.56335H15.8303V10.5012C16.3796 10.6283 16.9056 10.8429 17.3775 11.1529V8.76858L12.7359 4ZM17.6173 17.4315C18.6462 15.7546 18.1511 13.5372 16.5343 12.4881C14.902 11.431 12.7359 11.9476 11.7225 13.6007C10.6859 15.2777 11.1888 17.4871 12.8056 18.5442C13.935 19.2833 15.3739 19.2833 16.5111 18.5601L18.9247 21L20 19.8953L17.6173 17.4315ZM14.6699 17.511C14.157 17.511 13.6651 17.3017 13.3024 16.929C12.9397 16.5564 12.7359 16.051 12.7359 15.5241C12.7359 14.9971 12.9397 14.4917 13.3024 14.1191C13.6651 13.7465 14.157 13.5372 14.6699 13.5372C15.1829 13.5372 15.6748 13.7465 16.0375 14.1191C16.4002 14.4917 16.6039 14.9971 16.6039 15.5241C16.6039 16.051 16.4002 16.5564 16.0375 16.929C15.6748 17.3017 15.1829 17.511 14.6699 17.511Z"
                          fill="#AEAEB2"
                        />
                      </svg>
                    }
                  >
                    {" "}
                    <NavLink exact to="queries">
                      Queries
                    </NavLink>
                  </MenuItem>
                ) : (
                  <MenuItem
                    active={activeNav === `/queries` || activeNav == `/queries/${shootid}` ? true : false}
                    onClick={() => setActiveNave(`queries`, `/queries/${shootid}`)}
                    icon={
                      activeNav == `/queries` || activeNav == `/queries/${shootid}` ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.7359 4H6.54719C6.13685 4 5.74332 4.16747 5.45316 4.46556C5.16301 4.76366 5 5.16796 5 5.58953V18.3058C5 18.7273 5.16301 19.1316 5.45316 19.4297C5.74332 19.7278 6.13685 19.8953 6.54719 19.8953H11.9624C11.6452 19.6966 11.3435 19.4502 11.0805 19.18C10.8252 18.9177 10.6086 18.6237 10.4152 18.3058H6.54719V5.58953H11.9624V9.56335H15.8303V10.5012C16.3796 10.6283 16.9056 10.8429 17.3775 11.1529V8.76858L12.7359 4ZM17.6173 17.4315C18.6462 15.7546 18.1511 13.5372 16.5343 12.4881C14.902 11.431 12.7359 11.9476 11.7225 13.6007C10.6859 15.2777 11.1888 17.4871 12.8056 18.5442C13.935 19.2833 15.3739 19.2833 16.5111 18.5601L18.9247 21L20 19.8953L17.6173 17.4315ZM14.6699 17.511C14.157 17.511 13.6651 17.3017 13.3024 16.929C12.9397 16.5564 12.7359 16.051 12.7359 15.5241C12.7359 14.9971 12.9397 14.4917 13.3024 14.1191C13.6651 13.7465 14.157 13.5372 14.6699 13.5372C15.1829 13.5372 15.6748 13.7465 16.0375 14.1191C16.4002 14.4917 16.6039 14.9971 16.6039 15.5241C16.6039 16.051 16.4002 16.5564 16.0375 16.929C15.6748 17.3017 15.1829 17.511 14.6699 17.511Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.7359 4H6.54719C6.13685 4 5.74332 4.16747 5.45316 4.46556C5.16301 4.76366 5 5.16796 5 5.58953V18.3058C5 18.7273 5.16301 19.1316 5.45316 19.4297C5.74332 19.7278 6.13685 19.8953 6.54719 19.8953H11.9624C11.6452 19.6966 11.3435 19.4502 11.0805 19.18C10.8252 18.9177 10.6086 18.6237 10.4152 18.3058H6.54719V5.58953H11.9624V9.56335H15.8303V10.5012C16.3796 10.6283 16.9056 10.8429 17.3775 11.1529V8.76858L12.7359 4ZM17.6173 17.4315C18.6462 15.7546 18.1511 13.5372 16.5343 12.4881C14.902 11.431 12.7359 11.9476 11.7225 13.6007C10.6859 15.2777 11.1888 17.4871 12.8056 18.5442C13.935 19.2833 15.3739 19.2833 16.5111 18.5601L18.9247 21L20 19.8953L17.6173 17.4315ZM14.6699 17.511C14.157 17.511 13.6651 17.3017 13.3024 16.929C12.9397 16.5564 12.7359 16.051 12.7359 15.5241C12.7359 14.9971 12.9397 14.4917 13.3024 14.1191C13.6651 13.7465 14.157 13.5372 14.6699 13.5372C15.1829 13.5372 15.6748 13.7465 16.0375 14.1191C16.4002 14.4917 16.6039 14.9971 16.6039 15.5241C16.6039 16.051 16.4002 16.5564 16.0375 16.929C15.6748 17.3017 15.1829 17.511 14.6699 17.511Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      )
                    }
                  >
                    {" "}
                    <NavLink
                      // className={splitLocation[1] === "" ? "active" : ""}
                      // className="listDecoration" activeClassName="active"
                      exact
                      to="queries"
                    >
                      Queries
                    </NavLink>
                  </MenuItem>
                )}

                {menu ? (
                  <MenuItem
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 16.5L16.3846 21L13.1538 17.85L14.5385 16.5L16.3846 18.3L19.6154 15.15L21 16.5ZM4.84615 3C3.82154 3 3 3.81 3 4.8V19.2C3 20.199 3.82154 21 4.84615 21H12.0554C11.7231 20.442 11.4923 19.83 11.3815 19.2H4.84615V4.8H11.3077V9.3H15.9231V12.972C16.2277 12.927 16.5415 12.9 16.8462 12.9C17.16 12.9 17.4646 12.927 17.7692 12.972V8.4L12.2308 3H4.84615ZM6.69231 12V13.8H14.0769V12H6.69231ZM6.69231 15.6V17.4H11.3077V15.6H6.69231Z"
                          fill="#AEAEB2"
                        />
                      </svg>
                    }
                  >
                    {" "}
                    <NavLink exact to="/approval">
                      Approval
                    </NavLink>
                  </MenuItem>
                ) : (
                  <MenuItem
                    active={activeNav == "/approval" ? true : false}
                    onClick={() => setActiveNave("/approval")}
                    icon={
                      activeNav == "/approval" ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M21 16.5L16.3846 21L13.1538 17.85L14.5385 16.5L16.3846 18.3L19.6154 15.15L21 16.5ZM4.84615 3C3.82154 3 3 3.81 3 4.8V19.2C3 20.199 3.82154 21 4.84615 21H12.0554C11.7231 20.442 11.4923 19.83 11.3815 19.2H4.84615V4.8H11.3077V9.3H15.9231V12.972C16.2277 12.927 16.5415 12.9 16.8462 12.9C17.16 12.9 17.4646 12.927 17.7692 12.972V8.4L12.2308 3H4.84615ZM6.69231 12V13.8H14.0769V12H6.69231ZM6.69231 15.6V17.4H11.3077V15.6H6.69231Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M21 16.5L16.3846 21L13.1538 17.85L14.5385 16.5L16.3846 18.3L19.6154 15.15L21 16.5ZM4.84615 3C3.82154 3 3 3.81 3 4.8V19.2C3 20.199 3.82154 21 4.84615 21H12.0554C11.7231 20.442 11.4923 19.83 11.3815 19.2H4.84615V4.8H11.3077V9.3H15.9231V12.972C16.2277 12.927 16.5415 12.9 16.8462 12.9C17.16 12.9 17.4646 12.927 17.7692 12.972V8.4L12.2308 3H4.84615ZM6.69231 12V13.8H14.0769V12H6.69231ZM6.69231 15.6V17.4H11.3077V15.6H6.69231Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      )
                    }
                  >
                    {" "}
                    <NavLink exact to="/approval">
                      Approval
                    </NavLink>
                  </MenuItem>
                )}

                {menu ? (
                  <MenuItem
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 19.8247L18.1618 18.0701L20 16.3155L18.7745 15.1402L16.945 16.9031L15.1154 15.1402L13.89 16.3155L15.7282 18.0701L13.89 19.8247L15.1154 21L16.945 19.2371L18.7745 21L20 19.8247ZM5.726 4C4.76807 4 4 4.74489 4 5.65531V18.8978C4 19.8165 4.76807 20.5531 5.726 20.5531H12.466C12.1553 20.0399 11.9396 19.4771 11.836 18.8978H5.726V5.65531H11.767V9.79357H16.082V13.1704C16.3668 13.129 16.6602 13.1042 16.945 13.1042C17.2384 13.1042 17.5232 13.129 17.808 13.1704V8.96592L12.63 4H5.726ZM7.452 12.2765V13.9318H14.356V12.2765H7.452ZM7.452 15.5871V17.2425H11.767V15.5871H7.452Z"
                          fill="#AEAEB2"
                        />
                      </svg>
                    }
                  >
                    {" "}
                    <NavLink exact to="/decline">
                      Decline
                    </NavLink>
                  </MenuItem>
                ) : (
                  <MenuItem
                    active={activeNav == "/decline" ? true : false}
                    onClick={() => setActiveNave("/decline")}
                    icon={
                      activeNav == "/decline" ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 19.8247L18.1618 18.0701L20 16.3155L18.7745 15.1402L16.945 16.9031L15.1154 15.1402L13.89 16.3155L15.7282 18.0701L13.89 19.8247L15.1154 21L16.945 19.2371L18.7745 21L20 19.8247ZM5.726 4C4.76807 4 4 4.74489 4 5.65531V18.8978C4 19.8165 4.76807 20.5531 5.726 20.5531H12.466C12.1553 20.0399 11.9396 19.4771 11.836 18.8978H5.726V5.65531H11.767V9.79357H16.082V13.1704C16.3668 13.129 16.6602 13.1042 16.945 13.1042C17.2384 13.1042 17.5232 13.129 17.808 13.1704V8.96592L12.63 4H5.726ZM7.452 12.2765V13.9318H14.356V12.2765H7.452ZM7.452 15.5871V17.2425H11.767V15.5871H7.452Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 19.8247L18.1618 18.0701L20 16.3155L18.7745 15.1402L16.945 16.9031L15.1154 15.1402L13.89 16.3155L15.7282 18.0701L13.89 19.8247L15.1154 21L16.945 19.2371L18.7745 21L20 19.8247ZM5.726 4C4.76807 4 4 4.74489 4 5.65531V18.8978C4 19.8165 4.76807 20.5531 5.726 20.5531H12.466C12.1553 20.0399 11.9396 19.4771 11.836 18.8978H5.726V5.65531H11.767V9.79357H16.082V13.1704C16.3668 13.129 16.6602 13.1042 16.945 13.1042C17.2384 13.1042 17.5232 13.129 17.808 13.1704V8.96592L12.63 4H5.726ZM7.452 12.2765V13.9318H14.356V12.2765H7.452ZM7.452 15.5871V17.2425H11.767V15.5871H7.452Z"
                            fill="#AEAEB2"
                          />
                        </svg>
                      )
                    }
                  >
                    {" "}
                    <NavLink exact to="/decline">
                      Dechline
                    </NavLink>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideNav;

import React from "react";
import "./Header.css";



import { useState } from "react";

import {

  MenuOutlined,

} from "@material-ui/icons";
import SideNav from "./SideNav";

const Header = ({ setBodyWidth }) => {

  const [menuCollapse, setMenuCollapse] = useState(false);

  /////////notification////////

 
 
  ///
  ////////////////////sidebar collaps////////////////

  const updatePageState = () => {
    // menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    if (menuCollapse === false) {
      setMenuCollapse(true);
      setBodyWidth(true);
    } else {
      setMenuCollapse(false);
      setBodyWidth(false);
    }
  };



  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="row" style={{ alignItems: "center" }}>
          {/* <div className="topLeft"> */}
          <div className="col-3">
            <div className="closemenu" onClick={updatePageState}>
              <MenuOutlined  style={{width:"36px", height:"36px"}}/>
              {/* {menuCollapse ? <MenuOutlined /> : <MenuOutlined />} */}
            </div>

            <SideNav menuCollapse={menuCollapse} />
          </div>
          <div className="col-6">
            <h6>Dashboard</h6>
          </div>

         
        </div>

       
      </div>
    </div>
  );
};

export default Header;

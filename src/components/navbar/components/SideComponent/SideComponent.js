import React from "react";
import RoutesFile from "../../../Routes/RoutesFile";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const SideComponent = ({ HideNav,setHideToolbar }) => {

  return (
    <>
      {!HideNav && <Breadcrumb />}
      <div className={`${!HideNav && "mt-50"} `}>
        <RoutesFile setHideToolbar={setHideToolbar}  />
      </div>
    </>
  );
};

export default SideComponent;

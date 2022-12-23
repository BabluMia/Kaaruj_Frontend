import { CaretRight } from "phosphor-react";
import React from "react";
import { Tooltip } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sublink = ({ to, data, handleCLick }) => {
  const location = useLocation();

  return (
    <Link to={to} className={"sublink_container"}>
      <Tooltip title={data} placement="right">
      </Tooltip>

      <CaretRight className={`${location.pathname.includes(to) ? "active__rightArrowClass rightArrowClass" : "rightArrowClass"}`} />

        <Link to={to} className={`${location.pathname.includes(to) ? "active__collapse__sublink collapse__sublink" : "collapse__sublink"}`}>
          {data}
        </Link>
    </Link>
  );
};

export default Sublink;

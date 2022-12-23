import { HouseLine } from "phosphor-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const location_arr = location.pathname.split("/").slice(1);
  return (
    <nav aria-label="breadcrumb breadCrumb_custom">
      <ol class="breadcrumb breadCrumb_custom">
        <li class="breadcrumb-item">
          <HouseLine size={20} />
        </li>

        {location_arr.map((curr) => {
          return curr === "" ? (
            <li class="breadcrumb-item text-capitalize">Dashboard</li>
          ) : (
            <li class="breadcrumb-item text-capitalize">{curr.replace("-", " ")}</li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

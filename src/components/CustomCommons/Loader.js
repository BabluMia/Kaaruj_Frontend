import React from "react";
import { HashLoader, ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="categorey-parent w-100 h-25 d-flex justify-content-center align-items-center"
      style={{ height: "70%" }}
    >
      <ScaleLoader color="#000" />
    </div>
  );
};

export default Loader;

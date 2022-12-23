import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="categorey-parent w-100 h-25 d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <HashLoader color="#000" />
    </div>
  );
};

export default Loader;

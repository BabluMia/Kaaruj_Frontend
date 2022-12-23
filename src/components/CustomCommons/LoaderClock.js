import React from "react";
import { HashLoader } from "react-spinners";

const LoaderClock = () => {
  return (
    <div className="categorey-parent w-100 h-25 d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
      <div>
        <h2>Creating..</h2>
        <HashLoader color="#000" />
      </div>
    </div>
  );
};

export default LoaderClock;

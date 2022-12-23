import React from "react";
import box from "../../assets/Icon/box.svg";
import doc from "../../assets/Icon/invoice.svg";
import men from "../../assets/Icon/men.svg";
import time from "../../assets/Icon/time.svg";
import x from "../../assets/Icon/x.svg";

const SingleNotification = () => {
  return (
    <div
      style={{
        border: "0.5px solid #E0E0E0",
      }}
      className=" bg-white py-4 px-2 px-md-2 px-lg-4 "
    >
      <div className="d-flex flex-column flex-md-row justify-content-between notification-box">
        <div className="d-flex ">
          <div className="box-div me-3">
            <img src={box} alt="" />
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <h5 className="fw-bold">Low Inventory</h5>
            </div>
            <p>
              Your Inventory is Too <span className="fw-bold">Low</span>. Please
              Support multiple stocking, distribution locations and tiers
            </p>
          </div>
        </div>

        <div className="d-flex align-content-start ">
          <div className="mx-2">
            <img src={time} alt="" />
          </div>

          <p>March 30, 2020, 10:05 am</p>
          <div className="cross">
            <img src={x} alt="" />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default SingleNotification;

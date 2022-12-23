import React, { useEffect, useState } from "react";
import "./Notification.css";
import ball from "../../assets/Icon/ballIcon.svg";
import box from "../../assets/Icon/box.svg";
import doc from "../../assets/Icon/invoice.svg";
import men from "../../assets/Icon/men.svg";
import time from "../../assets/Icon/time.svg";
import x from "../../assets/Icon/x.svg";
import SingleNotification from "./SingleNotification";
import axios from "axios";
import { BASE_URL } from "../Const/Url";
import swal from "sweetalert";
import { showToast } from "../../utils/ToastHelper";
import ReactHtmlParser from "react-html-parser";
import Loader from "../CustomCommons/Loader";
import {
  can_delete_notifications,
  has_permissions,
} from "../CustomCommons/utils";

const Notification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getNotification = () => {
    const url = `${BASE_URL}api/v1/users/notifications/`;

    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data.results);
        const result = res.data.data.results;
        setNotificationList(result);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  const deleteNotigication = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/users/notifications/${id}`;
        axios
          .delete(url)
          .then(() => {
            showToast("Delele", "Data Deleted");
            getNotification();
          })
          .catch((err) => {
            const message = JSON.parse(err.request.response).message;
            console.log(message);
          });
        swal(" Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  useEffect(() => {
    getNotification();
    // deleteNotigication()
  }, []);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div
        className="notification_main py-4"
        style={{ background: "#FAFAFA", minHeight: "100vh" }}
      >
        <div className="d-flex align-items-center mb-3">
          <img src={ball} alt="" />
          <h5 className="mt-1 ms-2 ">Notification</h5>
        </div>
        {notificationList.map((n, index) => (
          <div
            key={index}
            style={{
              border: "0.5px solid #E0E0E0",
            }}
            className=" bg-white py-4 px-2 px-md-2 px-lg-4 "
          >
            <div className="d-flex flex-column flex-md-row justify-content-between notification-box">
              <div className="d-flex ">
                <div className="box-div me-3">
                  {/* <img src={box} alt="" /> */}
                  <img src={n?.title.includes("Customer") ? men  : n?.title.includes("Invoice") ? doc : box } alt="" />
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">{n.title}</h5>
                  </div>
                  {/* <p>
                    Your Inventory is Too <span className="fw-bold">Low</span>.
                    Please Support multiple stocking, distribution locations and
                    tiers
                  </p> */}
                  {ReactHtmlParser(n.info)}
                </div>
              </div>

              <div className="d-flex align-content-start ">
                <div className="mx-2">
                  <img src={time} alt="" />
                </div>

                <p>
                  {new Date(n.created_at).toLocaleDateString("en-US", options)}
                </p>
                {has_permissions(can_delete_notifications) ? (
                  <div
                    className="cross"
                    onClick={() => deleteNotigication(n.id)}
                  >
                    <img src={x} alt="" />
                  </div>
                ) : (
                  <div
                    className="cross"
                    onClick={() =>
                      swal("Sorry,You are not able to delete notification.")
                    }
                  >
                    <img src={x} alt="" />
                  </div>
                )}
              </div>
            </div>{" "}
          </div>
        ))}
        {/* ==============doc=========== */}
        {/* <div
          style={{
            border: "0.5px solid #E0E0E0",
          }}
          className=" bg-white py-4 px-2 px-md-2 px-lg-4 "
        >
          <div className="d-flex flex-column flex-md-row justify-content-between notification-box">
            <div className="d-flex ">
              <div className="box-div me-3">
                <img src={doc} alt="" />
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Invoice Created</h5>
                </div>
                <p>
                  <span className="fw-bold">Antu Islam</span>{" "}
                  genareted Invoice by{" "}
                  <span className="fw-bold">Ps portal</span>
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
        </div> */}
        {/* ==============doc=========== */}
        {/* ===============user======== */}
        {/* <div
          style={{
            border: "0.5px solid #E0E0E0",
          }}
          className=" bg-white py-4 px-2 px-md-2 px-lg-4 "
        >
          <div className="d-flex flex-column flex-md-row justify-content-between notification-box">
            <div className="d-flex ">
              <div className="box-div me-3">
                <img src={men} alt="" />
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Invoice Created</h5>
                </div>
                <p>
                  <span className="fw-bold"> Antu Islam</span> {" "}
                   genareted Invoice by {" "}
                  <span className="fw-bold">Ps portal</span>
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
        </div> */}
        {/* ===============user======== */}

        {/* <SingleNotification />
        <SingleNotification />
        <SingleNotification />
        <SingleNotification /> */}
      </div>
    </div>
  );
};

export default Notification;

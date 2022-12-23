import Header from "./components/navbar/components/header/Header";
import SideNav from "./components/navbar/SideNav";
import "./App.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "./components/Const/Url";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
const App = () => {
  //checks token valid or not
  const location = useLocation();
  const current_location = location.pathname;

  const history = useHistory();

  const check_token = () => {
    const url = `${BASE_URL}api/v1/auth/profile/`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(message);
        if (message === "Invalid token.") {
          // localStorage.setItem("expired", true);
          localStorage.removeItem("is_logged_in")
          localStorage.removeItem("access_token")
          localStorage.removeItem("userData")
          swal("Login expired!", "Please login again..", "warning");
          history.push("/login");
        }
      });
  };
  useEffect(() => {
    if (current_location.includes("login")) {
      console.log("include");
    } else {
      check_token();
    }
  }, [location.pathname]);

  return (
    <>
      <SideNav />
      <ToastContainer />
    </>
  );
};

export default App;

import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Const/Url";
import Loader from "../CustomCommons/Loader";
import cover from "./img/cover.png";
import profile from "./img/profile.png";

const UserInfo = ({ label, info, button }) => {
  return (
    <>
      <div className="row mb-4 user_view_info_P p-0">
        <div className="col-3 p-0">{label}</div>

        {button ? <>: <button className="user_view_button ms-1">{button}</button></> : <div className="col-9 p-0">: {info}</div>}
      </div>
    </>
  );
};
const gender = ["Male", "Female", "Other"];
const active =["Active","Disable"]

const userProfile = JSON.parse(window.localStorage.getItem("userData"));

const UserProfile = () => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const [userData, setUserData] = useState({});
  const [isLoading,setIsloading] =useState(true)
  const getUser = () => {

    const url = `${BASE_URL}api/v1/auth/profile/`;
    axios
      .get(url)
      .then((res) => {
        console.log(res,'--------------------data----------');
        // console.log(res.data.data.results);
        const result = res.data.data;
        setUserData(result);
        console.log(userData,'-------------')
        setIsloading(false)
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  if(isLoading){
    return <Loader/>
  }
  const gender = ["Male","Female","Other"]
  // <p>{new Date(orderInput.date).toLocaleDateString("en-US", options)} </p>;
  return (
    <div className="side_components_container">
      <div className="row ">
        <div className="col-lg-5 col-sm-12 col-xs-12 ">
          <div className="user_view_image p-0">
            <div className="card ">
              <img className="card-img-top" src={cover} alt="" />

              <div className="user_name_info d-flex justify-content-center flex-column">
                <img className="user_name_info_img "  style={{borderRadius:'50%'}} src={userData?.image ? `${BASE_URL}${userData?.image} ` : profile} alt="" />
                <h5 className="user_name_info_name">
                  {userData?.first_name} {userData?.last_name}
                </h5>
                <Link style={{fontSize:'16px ',width:'100px'}} className="user_name_info_role">{userProfile?.role !== "" ? userProfile?.role : "Admin"}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-sm-12 col-xs-12  user_view_contents p-0">
          <div className=" ">
            <h5 className="user_view_head ">Personal Details</h5>
            <div className="line_user_view mb-4 mt-3"></div>
            <UserInfo label="Email Address" info={userData?.email} />
            <UserInfo label="Phone Number" info={userData?.mobile ? userData?.mobile : "N/A"} />
            <UserInfo label="Date of Birth" info=" 26 September, 1994" />
            <UserInfo label="Gender" info={gender[userData.gender]} />
            <UserInfo label="Blood Group" info={userData?.blood_group ? userData?.blood_group : "N/A"} />
            <UserInfo label="Address" info={userData?.address ? userData?.address : "N/A"} />
            <UserInfo label="Account Status " button={userProfile?.is_active ? "Active" : "Disable"} />
            <UserInfo label="Joining Date" info={new Date(userData.joining_date).toLocaleDateString("en-US", options)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../Const/Url";
import Loader from "../CustomCommons/Loader";

import cover from "./img/cover.png";
import profile from "./img/profile.png";

const UserInfo = ({ label, info, button }) => {
  return (
    <>
      <div className="row mb-4 user_view_info_P p-0">
        <div className="col-3 p-0">{label}</div>

        {button ? (
          <>
            :<button className="user_view_button ms-1">{button}</button>
          </>
        ) : (
          <div className="col-9 p-0">{info}</div>
        )}
      </div>
    </>
  );
};
const ViewUser = () => {
  const [isLoading, setIsloading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState({});

  console.log("id----------", id);
  const getSingleUser = () => {
    const url = `${BASE_URL}api/v1/users/user/${id}`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data,'--------------------resdata----------')
        // console.log(res.data.data.filter(a=>a.id == id)[0])
        // const data = res.data.data.data.filter(a=> a.id == id)[0]
        // console.log(data)
        // setUser(data);
        // console.log(res.data.data.results)
        // const found = res.data.data.data.find((obj) => {
        //   return obj.id == id;
        // });
        setUser(res.data.data);
        // console.log(found);
        setIsloading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  const genders = ["Male", "Female", "Others"];
  console.log(user);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  useEffect(() => {
    getSingleUser();
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="side_components_container">
      <div className="row ">
        <div className="col-lg-5 col-sm-12 col-xs-12 ">
          <div className="user_view_image p-0">
            <div className="card ">
              <img className="card-img-top" src={cover} alt="" />

              <div className="user_name_info d-flex justify-content-center flex-column">
                <img
                  className="user_name_info_img "
                  style={{ borderRadius: "50%" }}
                  src={user?.image ? `${BASE_URL}${user?.image} ` : profile}
                  alt=""
                />
                <h5 className="user_name_info_name">
                  {user.first_name} {user.last_name}
                </h5>
                <Link
                  className="user_name_info_role text-center"
                  style={{ width: "150px" }}
                >
                  {user.role_name}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-sm-12 col-xs-12  user_view_contents user_view_contents3  p-0">
          <div className=" ">
            <h5 className="user_view_head ">Personal Details</h5>
            <div className="line_user_view mb-4 mt-3"></div>
            <UserInfo label="Email Address" info={`: ${user.email}`} />
            <UserInfo label="Phone Number" info={`: ${user.mobile}`} />
            {/* <UserInfo label="Date of Birth" info=": 26 September, 1994" /> */}
            <UserInfo label="Gender" info={`: ${genders[user?.gender]}`} />
            <UserInfo label="Blood Group" info={`: ${user?.blood_group}`} />

            {/* <UserInfo label="Account Status" button={`${user?.is_active ? 'Active' :'Disable'}`} /> */}
            <div className="row mb-4 user_view_info_P p-0">
              <div className="col-3 p-0">Account Status</div>:{" "}
              <button
                className="user_view_button ms-1"
                style={{
                  background: `${user?.is_active === false && "#749F82"}`,
                }}
              >{`${user?.is_active ? "Active" : "Disable"}`}</button>{" "}
            </div>

            {/* <UserInfo label="Joining Date" info=": May 7, 2022, 10:34 pm" /> */}
            <UserInfo
              label="Joining Date"
              info={`: ${new Date(user?.created_at).toLocaleDateString(
                "en-US",
                options
              )}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;

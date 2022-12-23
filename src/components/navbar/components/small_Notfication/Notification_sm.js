import React from "react";
import { Link } from "react-router-dom";
import "./notification_sm.css";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";
import img6 from "./img/6.png";
import * as path from '../../../Routes/RoutePaths'
import { BASE_URL } from "../../../Const/Url";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactHtmlParser from 'react-html-parser';

const data = [
  {
    img: img1,
    text: (
      <p className="notification_text_p">
        Antu Islam <span>create invoice by</span> Ecosystem and Conversation
      </p>
    ),
  },
  {
    img: img2,
    text: (
      <p className="notification_text_p">
        Antu Islam <span>create invoice by</span> Ecosystem and Conversation
      </p>
    ),
  },
  {
    img: img3,
    text: (
      <p className="notification_text_p">
        Antu Islam <span>create invoice by</span> Ecosystem and Conversation
      </p>
    ),
  },
  {
    img: img4,
    text: (
      <p className="notification_text_p">
        Antu Islam <span>create invoice by</span> Ecosystem and Conversation
      </p>
    ),
  },
  {
    img: img5,
    text: (
      <p className="notification_text_p">
        Antu Islam <span>create invoice by</span> Ecosystem and Conversation
      </p>
    ),
  },
  {
    img: img6,
    text: (
      <p className="notification_text_p">
        Antu Islam <span>create invoice by</span> Ecosystem and Conversation
      </p>
    ),
  },
];

const Notification_sm = ({ notificationClic, show , notificationList}) => {
  
  var options = {
    // weekday: "long",
    // year: "numeric",
    // month: "short",
    // day: "numeric",
    hour: 'numeric', minute: 'numeric', hour12: true
  };
  return (
    <div className={`Notfication_sm_containar shadow-sm ${!show && "d-none"} `}>
      <div className="row mb-3">
        <div className="col-6 notification_title">Notification</div>
        <div className="col-6 text-end ">
          <Link className="notification_clear_all d-none">Clear all</Link>
        </div>
      </div>
      <div className="line_notification"></div>
      
      {notificationList.slice(0,10).map((curr,index) => {
        return (
          <>
            <div className="row my-4" key={index}>
              <div className="col-2">
                <img style={{width:'35px',height:'35px',borderRadius:'50%'}} className="notification_sm_img" src={`${curr.image_url}`} alt="" />
              </div>
              <div className="col-10 notification_sm_text">
              { ReactHtmlParser(curr.info) }
                <p className="minute_ago">{new Date(curr.created_at).toLocaleDateString(
                      "en-US",
                      options
                    )}</p>
                    
                    
              </div>
            </div>
          </>
        );
      })}
      <div className="d-flex justify-content-center">
        <Link className="viewNotificationSm" to={path.notification}>
          view all notifications
        </Link>
      </div>
    </div>
  );
};

export default Notification_sm;

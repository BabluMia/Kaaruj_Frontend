import React from "react";
import { SignOut, UserCircle } from "phosphor-react";
import { useHistory } from "react-router-dom";
import * as path from "../../../Routes/RoutePaths";
import { useState } from "react";
import { showToast } from "../../../../utils/ToastHelper";

const Profile = () => {
  const history = useHistory();
  const [OnlogoutHide, setOnlogoutHide] = useState(0);
  const logout_func = () => {
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    setOnlogoutHide(1);
    showToast("success", "Logged Out Successfully");

    history.push("/login");
  };
  return (
    !OnlogoutHide && (
      <div className="profile-view px-3 pb-4 pt-3 " >
        <div>
          <UserCircle size={22} />
          <button className="ms-1" onClick={() => history.push('/user-profile')}>
            View Profile
          </button>
        </div>
        <div className="mt-3">
          <SignOut size={22} />
          <button onClick={logout_func} className="ms-1">
            Log Out
          </button>
        </div>
      </div>
    )
  );
};

export default Profile;

import React from "react";
import plus from "../../assets/Icon/plus.svg";
import user1 from "../../assets/Icon/user1.svg";
import user2 from "../../assets/Icon/user2.svg";
import user3 from "../../assets/Icon/user3.svg";
import user4 from "../../assets/Icon/user4.svg";
import { useHistory } from "react-router-dom";
import Paggination from "../CustomCommons/Paggination";
import ViewIcon from "../CustomCommons/ViewIcon";
import EditIcon from "../CustomCommons/EditIcon";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import { useState } from "react";
import swal from "sweetalert";
import * as path from "../Routes/RoutePaths";
import axios from "axios";
import { BASE_URL } from "../Const/Url";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import profile from "./img/profile.png";
import UseData from "../Const/UseData";
import Loader from "../CustomCommons/Loader";
import PreviousIcon from "../CustomCommons/PreviousIcon";
import NextIcon from "../CustomCommons/NextIcon";
import Permission from "../CustomCommons/Permission";
import {
  can_add_group,
  can_change_group,
  can_change_user,
  can_delete_user,
  can_view_user,
  has_permissions,
  test_has_permissions,
} from "../CustomCommons/utils";

const UserList = () => {
  const [isLoading, SetisLoading] = useState(true);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const userDetail = [
    {
      id: "1",
      name: "Surany Izabella",
      email: "sur990@email.com",
      type: "Manager",
      phone: "+447794754963",
      createDate: "15 May 2020 8:30 am",
      status: "Active",
      img: user1,
      StatusBtnColour: "#219653",
      typeBtnClor: "#F2994A",
    },
    {
      id: "2",
      name: "Toth Kamilla",
      email: "kam12@email.com",
      type: "Manager",
      phone: "+447794754963",
      createDate: "15 May 2020 8:30 am",
      status: "Active",
      img: user2,
      StatusBtnColour: "#219653",
      typeBtnClor: "#2F80ED",
    },
    {
      id: "3",
      name: "Surany Izabella",
      email: "sur990@email.com",
      type: "Admin",
      phone: "+447794754963",
      createDate: "15 May 2020 8:30 am",
      status: "Disable",
      img: user3,
      StatusBtnColour: "red",
      typeBtnClor: "#EB5757",
    },
    {
      id: "4",
      name: "Surany Izabella",
      email: "sur990@email.com",
      type: "Manager",
      phone: "+447794754963",
      createDate: "15 May 2020 8:30 am",
      status: "Active",
      img: user4,
      StatusBtnColour: "#219653",
      typeBtnClor: "#F2994A",
    },
  ];
  const [userData, setUserData] = useState(userDetail);
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;

  const getUserList = () => {
    const url = `${BASE_URL}api/v1/users/user/`;
    axios
      .get(url)
      .then((res) => {
        console.log("res", res);
        setUserList(res.data.data);

        SetisLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);
  console.log(userList);

  const keys = ["email", "last_name", "first_name", "joining_date", "mobile",'role_name'];
  const getData = userList?.filter((p) =>
    keys?.some((key) => p[key]?.toString()?.toLowerCase()?.includes(query))
  );
  const pageCount = Math.ceil(getData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/users/user/${id}`;
        axios
          .delete(url)
          .then(() => {
            // showToast("Delele", "Data Deleted");
            getUserList();
          })
          .catch((err) => {
            const message = JSON.parse(err.request.response).message;
            console.log(err.request.response);
          });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  var options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  // console.log(userList)
  if (!has_permissions(can_view_user)) {
    return <Permission />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="categorey-parent my-4" style={{ height: "100%" }}>
        <div className="cotagorey-head mb-4">
          <div>
            <h3>User List</h3>
            <input
              type="text"
              className="filter-input"
              placeholder="Search here"
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            />
          </div>
          {has_permissions(can_add_group) && (
            <div
              className="button-div"
              onClick={() => history.push(path.add_user)}
            >
              <img src={plus} alt="" />
              <span>Add User</span>
            </div>
          )}
        </div>
        {/* ----------user table -----------*/}

        <div style={{ overflowX: "auto" }} className="table-responsive">
          <div>
            {/* <div style={{ minHeight: "100vw" }}> */}
            <table className="table_my">
              <thead
                className="bg-dark text-white head-row"
                style={{ height: "50px" }}
              >
                <tr className="">
                  <th
                    className="ms-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      borderTopLeftRadius: "4px ",
                      // margin: "0px 20px",
                    }}
                  >
                    <p className="ms-3 mt-3">Full Name</p>
                  </th>
                  <th style={{ fontSize: "16px", fontWeight: "normal" }}>
                    User Type
                  </th>
                  <th style={{ fontSize: "16px", fontWeight: "normal" }}>
                    Phone
                  </th>
                  <th style={{ fontSize: "16px", fontWeight: "normal" }}>
                    Created On
                  </th>
                  <th style={{ fontSize: "16px", fontWeight: "normal" }}>
                    Status
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      borderTopRightRadius: "4px ",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="tb">
                {getData.length > 0 ? (
                  getData
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((user, index) => (
                      <tr key={user?.slug} className="table-row ">
                        <td>
                          <div className="d-flex ms-3">
                            <img
                              className="userListProfileimg"
                              src={
                                user?.image
                                  ? `${BASE_URL}${user?.image} `
                                  : profile
                              }
                              alt=""
                            />
                            <div className="ms-3">
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  marginTop: "10px !important",
                                }}
                              >
                                {user.first_name} {user.last_name}
                              </span>{" "}
                              <br />
                              <span
                                style={{ fontSize: "12px", marginTop: "-10px" }}
                              >
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm text-dark "
                            style={{
                              // backgroundColor: `${(user.role  && "#2F80ED") }`,
                              fontSize: "17px",
                            }}
                          >
                            {user.role_name ? user.role_name : "N/A"}
                          </button>
                        </td>
                        <td>{user.mobile}</td>
                        <td>
                          {new Date(user.joining_date).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </td>
                        <td className="">
                          <button
                            className={`status ${
                              user?.is_active ? "c1" : "c2"
                            }`}
                            style={{ color: `${user.StatusBtnColour}` }}
                          >
                            {user?.is_active ? "Active" : "Disable"}
                          </button>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-3">
                            <div
                              className="edit-del blue"
                              onClick={() =>
                                history.push(`/user/user-View/${user?.slug}`)
                              }
                            >
                              <ViewIcon />
                            </div>
                            {has_permissions(can_change_user) ? (
                              <div
                                className="edit-del green"
                                onClick={() =>
                                  history.push(`/user/edit-user/${user?.slug}`)
                                }
                              >
                                <EditIcon />
                              </div>
                            ) : (
                              <div
                                className="edit-del green"
                                onClick={() =>
                                  swal("Sorry , You are not able to edit user.")
                                }
                              >
                                <EditIcon />
                              </div>
                            )}
                            {has_permissions(can_delete_user) ? (
                              <div
                                className="edit-del red"
                                onClick={() => deleteUser(user?.slug)}
                              >
                                <DeleteIcon />
                              </div>
                            ) : (
                              <div
                                className="edit-del red"
                                onClick={() =>
                                  swal(
                                    "Sorry , You are not able to delete user."
                                  )
                                }
                              >
                                <DeleteIcon />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colspan="9">
                      <div className="not_found d-flex justify-content-center align-items-center py-4">
                        <h4 className="my-4">No Data Found</h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* entites and paggination */}
        {getData.length > 0 && (
          <div className="row pag" style={{ marginTop: "30px" }}>
            <div className="col-6 col-md-5">
              <p
                className="inter"
                style={{ color: "#AEAEB2", fontSize: "16px" }}
              >
                Total Entries:{" "}
                <span style={{ color: "black", fontSize: "14px" }}>
                  {userList.length}
                </span>
              </p>
            </div>
            <div className="col-12 col-md-6 d-flex paggination-button">
              <ReactPaginate
                previousLabel={<PreviousIcon />}
                nextLabel={<NextIcon />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"a"}
                nextLinkClassName={"a"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;

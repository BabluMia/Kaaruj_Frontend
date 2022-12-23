import React from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { PlusCircle, Star, Trash } from "phosphor-react";
import MultipleInput from "../CustomCommons/MultipleInput";
import RequiredLabel from "../CustomCommons/RequiredLabel";
import CreatableSelect from "react-select/creatable";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import swal from "sweetalert";
import axios from "axios";
import { BASE_URL } from "../Const/Url";
import { useEffect } from "react";
import { showToast } from "../../utils/ToastHelper";
import Loader from "../CustomCommons/Loader";
import { useRef } from "react";
import { can_change_role, can_delete_role, can_view_role, has_permissions } from "../CustomCommons/utils";
import Permission from "../CustomCommons/Permission";

const AddRole = () => {
  const selectInputRef = useRef()
  const [atttibute, setAttribute] = useState([
    { id: 1, name: "Manager" },
    { id: 2, name: "Admin" },
  ]);
  const [attributeData, setAttributeData] = useState(atttibute);
  const options1 = [
    { value: "User", label: "User" },
    { value: "Invoice", label: "Invoice" },
    { value: "Product", label: "Product" },
    { value: "Notification", label: "Notification" },
  ];

  const [mainArray, SetmainArray] = useState([]);
  const [GroupList, SetGroupList] = useState([]);
  const [RoleList, SetRoleList] = useState([]);
  const [RoleName, SetRoleName] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const postRole = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    const url = `${BASE_URL}api/v1/users/role/`;
    const data = {};

    if (RoleName === "" || RoleName === " " || RoleName === "  ") {
      showToast("error", "Roles and Group name can't be empty..");
      return 0;
    } else if (RoleName.length <= 1) {
      showToast("error", "Role Name is too small..");
      return 0;
    } else if (roles.length <= 0) {
      showToast("error", "Role Name is too small..");
      return 0;
    } else {
      // formData.append("name", RoleName);
      // formData.append("roles", roles);
      data["name"] = RoleName;
      data["roles"] = roles;
    }

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.status) {
          getRoles();
          showToast("success", "Role Added.");
         
          
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        showToast("error", errorMsg.msg);
      });

    // e.target.reset();
  };
  const handleChange = (newValue, actionMeta) => {
    // console.log(newValue,'------new Value');
    setAttribute(newValue);
    let arr = [];
    newValue.map((a) => arr.push(a.value));
    console.log(arr);
    setRoles(arr);
  };
  console.log("GroupList", GroupList);
  // const deleteData = (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this imaginary file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       // const filterd = attributeData.filter((a) => a.id !== id);
  //       setAttributeData(filterd);
  //       swal("Poof! Your data has been deleted!", {
  //         icon: "success",
  //       });
  //     } else {
  //       swal("Your data is safe!");
  //     }
  //   });
  // };

  const deleteRole = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/users/role/${id}`;
        axios
          .delete(url)
          .then(() => {
            showToast("Delele", "Role Deleted");
            getRoles();
          })
          .catch((err) => {
            const message = JSON.parse(err.request.response).message;
            console.log(err.request.response);
          });
        swal(" Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };

  const getGroups = () => {
    const url = `${BASE_URL}api/v1/users/group/`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        const options = res.data.data.map((curr) => ({
          label: curr.name,
          value: curr.id,
        }));
        SetGroupList(options);
        // console.log(options,'--------GroupList---------');
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  const getRoles = () => {
    const url = `${BASE_URL}api/v1/users/role/`;
    axios
      .get(url)
      .then((res) => {
        // console.log("role res", res);
        SetRoleList(res.data.data);
        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  console.log("RoleList", RoleList);
  const handleGroup = (newVal, actionMeta) => {
    // console.log(newVal)
  };
  useEffect(() => {
    getRoles();
    getGroups();
  }, []);
  var options = {
    // weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  if(!has_permissions(can_view_role)){
    return <Permission/>
  }
  if (isLoading) {
    return <Loader />;
  }

  

  return (
    <div
      className="categorey-parent pd-right"
      style={{ height: "100%", background: "#FAFAFA" }}
    >
      {
        has_permissions(can_change_role) && <div className="bg-white">
        <div
          className="d-flex align-items-center"
          style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}
        >
          {/* <PlusCircle size={32} /> */}
          <h3 className="head-tag" style={{ marginTop: "6px" }}>
            Add New Role
          </h3>
        </div>
        <div className="px-3 px-md-4 pt-4 pb-3">
          <RequiredLabel text="Name" />
          <form onSubmit={postRole}>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#FAFAFA" }}
                placeholder="New Role"
                name="name"
                onChange={(e) => SetRoleName(e.target.value)}
              />
            </InputGroup>
            <div className="col-12 my-3">
              <RequiredLabel text="Group" />
              <div className="main-select">
                <CreatableSelect isMulti onChange={handleChange} options={GroupList} />
              </div>

              {/* <MultipleInput TotalItems={SetmainArray} defaultValues={["User"]} /> */}
              {/* <div className="DropdownMultipleInput">
                <p className="activeMultiInput">Invoice</p>
                <p className="text-secondary">User</p>
                <p>Product</p>
                <p>Notification</p>
              </div> */}
            </div>
            <input
              type="submit"
              className="attribute-submit"
              value={"Submit"}
            />
            {/* <button></button> */}
          </form>
        </div>
      </div>
      }
      

      {/* ======table===== */}
      <div className="" style={{ marginTop: "50px", marginBottom: "50px" }}>
        <h5 className="my-3 ms-1" style={{ fontSize: "23px" }}>
          Role Table
        </h5>
        <div
          className="me-3 me-md-0 table-responsive"
          style={{ display: "block", overflowX: "auto" }}
        >
          <table className="w-100 small_tables">
            <thead
              className="bg-dark text-white head-row"
              style={{ height: "50px", borderTopLeftRadius: "20px !important" }}
            >
              <tr className="">
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    textAlign: "center",
                    borderTopLeftRadius: "4px ",
                  }}
                >
                  S/N
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    // textAlign: "center",
                    width:'200px'
                  }}
                >
                  Groups
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    textAlign: "center",
                  }}
                >
                  Create On
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
              {RoleList.map((a, index) => (
                <tr
                  key={a.id}
                  className="table-row"
                  style={{ height: "40px", textAlign: "center" }}
                >
                  <td>{index + 1}</td>
                  <td>{a.name}</td>
                  <td className="text-start">{a?.groups.map(b=> <span key={b}>{b},</span>)}</td>
                  <td>
                    {new Date(a.created_at).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </td>
                  <td>
                    {
                      has_permissions(can_delete_role) ? <div
                      className="edit-del red"
                      style={{ width: "30px", margin: "0 auto" }}
                      onClick={() => deleteRole(a.id)}
                    >
                      <DeleteIcon />
                    </div> : <div
                      className="text-secondary"
                      style={{ width: "30px", margin: "0 auto" }}
                      onClick={() => swal('Sorry, You are not able to delete role!')}
                    >
                      <DeleteIcon />
                    </div>
                    }
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddRole;

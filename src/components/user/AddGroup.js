import axios from "axios";
import { Eye, PlusCircle, Trash } from "phosphor-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import swal from "sweetalert";
import { showToast } from "../../utils/ToastHelper";
import { BASE_URL } from "../Const/Url";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import EditIcon from "../CustomCommons/EditIcon";
import MultipleInput from "../CustomCommons/MultipleInput";
import RequiredLabel from "../CustomCommons/RequiredLabel";
import CreatableSelect from "react-select/creatable";
import Loader from "../CustomCommons/Loader";
import Select from "react-select";
import { can_add_group, can_change_group, can_delete_group, can_view_group, has_permissions } from "../CustomCommons/utils";
import Permission from "../CustomCommons/Permission";

const AddGroup = () => {
  const option = [
    { value: "Invoice", label: "Invoice" },
    { value: "User", label: "User" },
    { value: "Product", label: "Product" },
    { value: "Categorey", label: "Categorey" },
    { value: "silver", label: "Silver" },
  ];
  const [atttibute, setAttribute] = useState([
    { id: 1, name: "Manager" },
    { id: 2, name: "Admin" },
  ]);
  const [addGroupTable, setAddGroupTable] = useState(atttibute);
  const itemData = [
    { id: 1, itemName: "Red-M", price: 1, stock: 12 },
    { id: 2, itemName: "Red-L", price: 1, stock: 12 },
    { id: 3, itemName: "Green-M", price: 1, stock: 12 },
    { id: 4, itemName: "Green-L", price: 1, stock: 12 },
  ];
  const [isLoading, SetisLoading] = useState(true);
  const [mainArray, SetmainArray] = useState([]);
  const [GroupName, SetGroupName] = useState("");
  // const [Permission, SetPermission] = useState({});
  const [GroupList, SetGroupList] = useState([]);
  const [SingleGroupList, SetSingleGroupList] = useState([]);
  const [defaultOptionsGroup, SetdefaultOptionsGroup] = useState([]);
  const [modelList, SetmodelList] = useState([]);
  const [mainState, setMainState] = useState([]);
  const [groupId, setgroupId] = useState(null);
  var options = {
    // weekday: "long",
    year: "numeric",
    month: "short",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  var modelsStatic = ["Group", "Role", "User", "Category", "Products", "Attributes", "Customer", "Invoice", "Daily Report", "Notifications"];
  const Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handlevalue = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setAttribute([...atttibute, { id: new Date(), name: name }]);
    e.target.reset();
  };
  const deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const filtered = addGroupTable.filter((a) => a.id !== id);
        setAddGroupTable(filtered);
        getGroups();
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  console.log("check GroupList", GroupList);
  console.log("check mainstate", mainState);
  console.log("check GroupName", GroupName);

  const clearData = () => {
    SetGroupName("");
    setMainState({});
    SetdefaultOptionsGroup({});
    setgroupId(null);
  };

  const validateData = () => {
    if (GroupName === "") {
      showToast("error", "Group Name can't be empty..");
      return 0;
    } else if (Object.keys(mainState).length <= 0) {
      showToast("error", "Group permissions can't be empty..");
      return 0;
    }
    for (let item in mainState) {
      if (Object.values(mainState[item]).length <= 0) {
        showToast("error", `${item} is empty`);
        return 0;
      }
    }
    if (groupId === null) {
      PostGroup();
    } else {
      UpdateGroup();
    }
  };

  const UpdateGroup = () => {
    const url = `${BASE_URL}api/v1/users/group/${groupId}/`;
    const obj = {};

    const data = {
      [GroupName]: obj,
    };

    for (let item in mainState) {
      const arr = [];

      for (let inneritem in mainState[item]) {
        if (mainState[item][inneritem]) {
          console.log(inneritem);

          console.log(mainState[item][inneritem]);

          arr.push(inneritem);
        }
        obj[item] = arr;
      }
      console.log(arr);
      console.log(obj);
    }
    console.log("----------------------------");
    console.log("data", data);

    console.log("----------------------------");

    axios
      .patch(url, data)
      .then((res) => {
        if (res.data.status) {
          clearData();
          showToast("success", "Group Updated.");
          getGroups();
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        console.log("errorMsg", errorMsg);
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key]}`);
        }
      });
  };

  const PostGroup = () => {
    const url = `${BASE_URL}api/v1/users/group/`;
    const obj = {};

    const data = {
      [GroupName]: obj,
    };

    for (let item in mainState) {
      const arr = [];

      for (let inneritem in mainState[item]) {
        if (mainState[item][inneritem]) {
          console.log(inneritem);

          console.log(mainState[item][inneritem]);

          arr.push(inneritem);
        }
        obj[item] = arr;
      }
      console.log(arr);
      console.log(obj);
    }
    console.log("----------------------------");
    console.log("data", data);

    console.log("----------------------------");

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.status) {
          clearData();
          showToast("success", "Group Added.");
          getGroups();
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        console.log("errorMsg", errorMsg);
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key]}`);
        }
      });
  };
  const getGroups = () => {
    const url = `${BASE_URL}api/v1/users/group/`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        SetGroupList(res.data.data);
        SetisLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  const getSingleGroup = (id) => {
    SetisLoading(true);

    const url = `${BASE_URL}api/v1/users/group/?id=${id}`;
    axios
      .get(url)
      .then((res) => {
        var result = res?.data?.data[0];
        var resultpermissions = result?.permissions;
        var resultName = result?.name;
        var resultNameList = resultpermissions.map((curr) => curr.name);

        // console.log("resultName",resultName)
        // console.log("resultNameList",resultNameList)
        console.log("resultpermissions", resultpermissions);
        console.log("result", result);

        var objMake = {};
        // !was helpful :https://bobbyhadz.com/blog/javascript-add-key-value-pair-to-object
        for (let key in resultpermissions) {
          console.log("result key", resultpermissions[key]);
          var currentObj = resultpermissions[key];
          var appName = currentObj.codename.split("_")[0];
          objMake[Capitalize(currentObj.content_type)] = {
            ...objMake[Capitalize(currentObj.content_type)],
            [appName]: true,
          };
        }
        console.log("result - obj", objMake);

        var defaultOptionsMake = Object.keys(objMake).map((curr, index) => ({
          value: index,
          label: curr,
        }));
        SetdefaultOptionsGroup(defaultOptionsMake);
        // for(let key in )
        // // resultNameList = [ "Can change role", "Can delete role", "Can view role", "Can add products", "Can change products", "Canme);
        SetSingleGroupList(objMake);
        SetGroupName(resultName);
        SetisLoading(false);
        setMainState(objMake);
        setgroupId(result.id);
        // console.log(res.data);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  console.log("SingleGroupList", SingleGroupList);
  const deleteGroup = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/users/group/${id}`;
        axios
          .delete(url)
          .then(() => {
            showToast("Delele", "Data Deleted");
            getGroups();
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

  const getModelList = () => {
    // const url = `${BASE_URL}api/v1/users/model/`;

    // axios
    //   .get(url)
    //   .then((res) => {
    //     // console.log(res.data.data.results);
    //     const result = res.data.data;
    //     console.log("result", result);
    //     const options = [];
    //     result.map((curr, index) => options.push({ label: curr, value: index }));
    //     console.log("options", options);
    //     console.log("options_created", options);
    //     SetmodelList(options);
    //   })
    //   .catch((err) => {
    //     // const message = JSON.parse(err?.request?.response).message;
    //     // console.log(err.request.response);
    //   });
    const options = [];
    modelsStatic.map((curr, index) => options.push({ label: curr, value: index }));
    SetmodelList(options);
  };
  console.log("modelList", modelList);
  useEffect(() => {
    getGroups();
    getModelList();
  }, []);
  console.log("mainState", mainState);
  const handleMultiInputChange = (newValue, actionMeta) => {
    console.log(actionMeta);
    const newVal = actionMeta?.option?.label;
    console.log("actionMeta.action", actionMeta.action);
    if (actionMeta.action === "create-option" || actionMeta.action === "select-option") {
      setMainState({ ...mainState, [newVal]: {} });
    }
    if (actionMeta.action === "remove-value") {
      delete mainState[actionMeta.removedValue.label];
      setMainState({ ...mainState });
    }
  };

  const handleCheckBoxChange = (e, variantName) => {
    let name = e.target.name;
    let checked = e.target.checked;
    console.log(name, checked);
    setMainState({
      ...mainState,
      [variantName]: { ...mainState[variantName], [name]: checked },
    });
  };

  const editGroup = (id) => {
    getSingleGroup(id);
  };
  if (!has_permissions(can_view_group)) {
    return <Permission />;
  }
  // if (!has_permissions(can_add_group)) {
  //   swal("has permisshion");
  // }
  // console.log("SingleGroupList", SingleGroupList);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="categorey-parent pd-right" style={{ height: "100%", background: "#FAFAFA" }}>
      <div className="bg-white">
        {has_permissions(can_add_group) && groupId === null && (
          <>
            <div className="d-flex align-items-center" style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}>
              <h3 className="head-tag" style={{ marginTop: "6px" }}>
                {groupId === null ? "Add New Group" : "Edit Group"}
              </h3>
            </div>

            <div className="px-3 px-md-4 pt-4 pb-3">
              <RequiredLabel text="Name" />
              <form action="" onSubmit={(e) => handlevalue(e)}>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    placeholder="New Group"
                    name="group_name"
                    value={GroupName}
                    onChange={(e) => SetGroupName(e.target.value)}
                  />
                </InputGroup>
                {console.log("defaultOptionsGroup", defaultOptionsGroup)}
                {defaultOptionsGroup.length > 0 ? (
                  <div className="col-12 my-3">
                    <RequiredLabel text="Permission" />
                    <Select
                      isMulti
                      isClearable={true}
                      styles={{ height: "65px" }}
                      options={modelList}
                      defaultValue={defaultOptionsGroup}
                      placeholder="Enter a choice value"
                      onChange={handleMultiInputChange}
                    />
                  </div>
                ) : (
                  <div className="col-12 my-3">
                    <RequiredLabel text="Permission" />
                    <Select
                      isMulti
                      styles={{ height: "65px" }}
                      options={modelList}
                      placeholder="Enter a choice value"
                      onChange={handleMultiInputChange}
                    />
                  </div>
                )}

                <div>
                  <table className="item-tables my-4 " style={{ overflowX: "auto", display: "block" }}>
                    <thead>
                      <tr className="trod" style={{ height: "45px" }}>
                        <td className="minw" style={{ width: "340px", textAlign: "center" }}>
                          Variant
                        </td>
                        <td className="minw" style={{ width: "380px", textAlign: "center" }}>
                          Retrieve
                        </td>
                        <td className="minw" style={{ width: "398px", textAlign: "center" }}>
                          Update{" "}
                        </td>
                        <td className="minw" style={{ width: "210px", textAlign: "center" }}>
                          Create
                        </td>
                        <td className="minw" style={{ width: "210px", textAlign: "center" }}>
                          Delete
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(mainState).map((item) => (
                        <tr className="trod" key={item.id} style={{ height: "45px" }}>
                          <td className="ps-1 ps-md-2 ps-lg-4">{item}</td>
                          <td className="text-center">
                            <input
                              className="user_radio black black_input"
                              checked={mainState[item]["view"]}
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              name="view"
                              type="checkbox"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="user_radio black black_input"
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              checked={mainState[item]["change"]}
                              name="change"
                              type="checkbox"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="user_radio black_input"
                              checked={mainState[item]["add"]}
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              name="add"
                              type="checkbox"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="user_radio black black_input"
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              checked={mainState[item]["delete"]}
                              name="delete"
                              type="checkbox"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <input type="submit" onClick={validateData} className="attribute-submit" value={groupId === null ? "Create" : "Update"} />
                {/* <button></button> */}
              </form>
            </div>
          </>
        )}

        {has_permissions(can_change_group) && groupId !== null && (
          <>
            <div className="d-flex align-items-center" style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}>
              <h3 className="head-tag" style={{ marginTop: "6px" }}>
                {groupId === null ? "Add New Group" : "Edit Group"}
              </h3>
            </div>

            <div className="px-3 px-md-4 pt-4 pb-3">
              <RequiredLabel text="Name" />
              <form action="" onSubmit={(e) => handlevalue(e)}>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    placeholder="New Group"
                    name="group_name"
                    value={GroupName}
                    onChange={(e) => SetGroupName(e.target.value)}
                  />
                </InputGroup>
                {console.log("defaultOptionsGroup", defaultOptionsGroup)}
                {defaultOptionsGroup.length > 0 ? (
                  <div className="col-12 my-3">
                    <RequiredLabel text="Permission" />
                    <Select
                      isMulti
                      isClearable={true}
                      styles={{ height: "65px" }}
                      options={modelList}
                      defaultValue={defaultOptionsGroup}
                      placeholder="Enter a choice value"
                      onChange={handleMultiInputChange}
                    />
                  </div>
                ) : (
                  <div className="col-12 my-3">
                    <RequiredLabel text="Permission" />
                    <Select
                      isMulti
                      styles={{ height: "65px" }}
                      options={modelList}
                      placeholder="Enter a choice value"
                      onChange={handleMultiInputChange}
                    />
                  </div>
                )}

                <div>
                  <table className="item-tables my-4 " style={{ overflowX: "auto", display: "block" }}>
                    <thead>
                      <tr className="trod" style={{ height: "45px" }}>
                        <td className="minw" style={{ width: "340px", textAlign: "center" }}>
                          Variant
                        </td>
                        <td className="minw" style={{ width: "380px", textAlign: "center" }}>
                          Retrieve
                        </td>
                        <td className="minw" style={{ width: "398px", textAlign: "center" }}>
                          Update{" "}
                        </td>
                        <td className="minw" style={{ width: "210px", textAlign: "center" }}>
                          Create
                        </td>
                        <td className="minw" style={{ width: "210px", textAlign: "center" }}>
                          Delete
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(mainState).map((item) => (
                        <tr className="trod" key={item.id} style={{ height: "45px" }}>
                          <td className="ps-1 ps-md-2 ps-lg-4">{item}</td>
                          <td className="text-center">
                            <input
                              className="user_radio black black_input"
                              checked={mainState[item]["view"]}
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              name="view"
                              type="checkbox"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="user_radio black black_input"
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              checked={mainState[item]["change"]}
                              name="change"
                              type="checkbox"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="user_radio black_input"
                              checked={mainState[item]["add"]}
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              name="add"
                              type="checkbox"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="user_radio black black_input"
                              onChange={(e) => handleCheckBoxChange(e, item)}
                              checked={mainState[item]["delete"]}
                              name="delete"
                              type="checkbox"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <input type="submit" onClick={validateData} className="attribute-submit" value={groupId === null ? "Create" : "Update"} />
                {/* <button></button> */}
              </form>
            </div>
          </>
        )}
      </div>

      {/* ======table===== */}
      <div className="" style={{ marginTop: "50px", marginBottom: "50px" }}>
        <h5 className="my-3 ms-1" style={{ fontSize: "23px" }}>
          Group Table
        </h5>
        <div className="me-3 mb-5 me-md-0" style={{ display: "block", overflowX: "auto" }}>
          <table className="w-100">
            <thead className="bg-dark text-white head-row" style={{ height: "50px", borderTopLeftRadius: "20px !important" }}>
              <tr className="">
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    minWidth: "20%",
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
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Create On
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Updated On
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    borderTopRightRadius: "4px ",
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="tb">
              {GroupList.map((a, index) => (
                <tr key={a.id} className="table-row" style={{ height: "40px", textAlign: "center" }}>
                  <td>{index + 1}</td>
                  <td>{a.name}</td>
                  <td>{new Date(a.created_at).toLocaleDateString("en-US", options)}</td>
                  <td>{new Date(a.updated_at).toLocaleDateString("en-US", options)}</td>
                  <td className="">
                    <div className="d-flex justify-content-center gap-3">
                      {/* !Importtant Edit icon hidden temporary */}
                      {has_permissions(can_change_group) ? (
                        <div className="edit-del green" onClick={() => editGroup(a.id)}>
                          <EditIcon />
                        </div>
                      ) : (
                        <div className="edit-del green" onClick={() => swal("Sorry , You are not able to edit group.")}>
                          <EditIcon />
                        </div>
                      )}

                      {has_permissions(can_delete_group) ? (
                        <div className="edit-del red" onClick={() => deleteGroup(a.id)}>
                          <DeleteIcon />
                        </div>
                      ) : (
                        <div className="edit-del red" onClick={() => swal("Sorry , You are not able to edit group.")}>
                          <DeleteIcon />
                        </div>
                      )}
                    </div>
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

export default AddGroup;

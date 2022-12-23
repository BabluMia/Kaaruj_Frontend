import { Eye, PlusCircle } from "phosphor-react";
import React from "react";
import { Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import "./css/user.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import RequiredLabel from "../CustomCommons/RequiredLabel";
import CustomSelect from "../CustomCommons/CustomSelect";
import { handleInputs } from "../../utils/HandleInputs";
import { BASE_URL } from "../Const/Url";
import axios from "axios";
import SelectDropDown from "../CustomCommons/SelectDropDown";
import { useEffect } from "react";
import { showToast } from "../../utils/ToastHelper";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import * as path from "../Routes/RoutePaths";
import { can_add_user, has_permissions, test_has_permissions } from "../CustomCommons/utils";
import Permission from "../CustomCommons/Permission";
import Select from "react-select";
const AddUser = () => {
  const [gender, setGender] = useState(0);
  const [phone, setphone] = useState(1);
  const [fileName, setFileName] = useState("");
  const [optional, setOptional] = useState("");
  const [ProfileImage, setProfileImage] = useState(null);
  const [GroupList, SetGroupList] = useState([]);
  const [RoleList, SetRoleList] = useState([]);
  const [selectedOptionGroup, setSelectedOptionGroup] = useState(null);
  const [selectedOptionRole, setSelectedOptionRole] = useState(null);
  const [status, setStatus] = useState(true);
  const history = useHistory();

  const [userAllData, SetuserAllData] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_mobile: "",
    user_blood_group: "",
    user_password: "",
  });
  const [cCode, setCCode] = useState("880");

  const [URL, setURL] = useState("");
  const fileHandle = (e) => {
    setProfileImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setURL(reader.result);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setURL(reader.result);
      }
    };
  };

  console.log("selectedOptionRole",selectedOptionRole)
  const handleOptional = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setOptional(reader.result);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setOptional(reader.result);
      }
    };
  };

  const getGroups = () => {
    const url = `${BASE_URL}api/v1/users/group/`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        const options = res.data.data.map((curr) => ({
          label: curr.name,
          value: curr.id,
        }));
        SetGroupList(options);
        // console.log(res.data);
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
        console.log("get_roles", res.data.data);
        const options = res.data.data.map((curr) => ({
          label: curr.name,
          value: curr.id,
        }));
        SetRoleList(options);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  useEffect(() => {
    getGroups();
    getRoles();
  }, []);

  const clearData = () => {
    SetuserAllData({
      product_name: "",
      product_description: "",
      product_tax: "",
      product_vat: "",
      product_discount: "",
      product_quantity: "",
      product_price: "",
    });
  };

  const postUser = () => {
    const bd = /^[1][0-9]{9}$/;
    if (!bd.test(userAllData["user_mobile"]?.replace("+880", ""))) {
      showToast("error", "From Mobile : Please Enter Valid phone number");
      return 0;
    }
    const url = `${BASE_URL}api/v1/users/user/`;
    const phoneData = `+${cCode}${userAllData["user_mobile"]}`;

    const data = new FormData();
    data.append("first_name", userAllData["user_first_name"]);
    data.append("last_name", userAllData["user_last_name"]);
    data.append("email", userAllData["user_email"]);
    data.append("blood_group", userAllData["user_blood_group"]);
    data.append("mobile", phoneData);
    data.append("password", userAllData["user_password"]);
    data.append("image", ProfileImage); 
    data.append("is_active", status );
    if (
      selectedOptionRole !== null &&
      selectedOptionRole !== undefined &&
      selectedOptionRole.value !== null &&
      selectedOptionRole.value !== undefined &&
      typeof selectedOptionRole.value !== "string"
    ) {
      data.append("role", selectedOptionRole.value);
    } else {
      showToast("error", "Role can't be empty..");
    }
    data.append("gender", gender);
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.status) {
          clearData();
          showToast("success", "User Added.");
          history.push(path.user_list);
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
      });
  };
  const removeImg = () => {
    swal({
      title: "Are you sure?",
      text: "Once Removed, you will not be able to recover this  file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setURL("");
        setFileName("");
        swal("Poof! Your  file has been Removed!", {
          icon: "success",
        });
      } else {
        swal("Your  file is safe!");
      }
    });
  };
  const changeStat = () => {
    setStatus(prev => !prev);
  };

  const handleCancelButton = () => {
    history.push(path.user_list);
  };
  const getSelectRole =(val,action)=>{
    
    setSelectedOptionRole(val)
  }
  console.log(gender,'--=-=-=-=-=-=-=-=-=-=-')
  console.log(status,'--=-=-=-=-=-=-=-=-=-=-')
  if (!has_permissions(can_add_user)) {
    return <Permission />;
  }

  return (
    <div className="side_components_container" style={{ background: "#FAFAFA" }}>
      <div className="bg-white ">
        <div className="d-flex align-items-center" style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}>
          {/* <PlusCircle size={30} /> */}
          <h3 style={{ fontSize: "23px", marginTop: "6px" }}>Add New User</h3>
        </div>
        {/* -----------product form---------- */}
        <div
          style={{
            paddingTop: "20px",
            padding: "20px 35px ",
            borderBottom: " 0.5px solid #E0E0E0",
            borderRight: " 0.5px solid #E0E0E0",
            borderLeft: "0.5px solid #E0E0E0",
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <RequiredLabel text="First Name" />
              <InputGroup className="mb-3">
                <Form.Control
                  name="user_first_name"
                  value={userAllData["user_first_name"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">
              <RequiredLabel text="Last Name" />
              <InputGroup className="mb-3">
                <Form.Control
                  name="user_last_name"
                  value={userAllData["user_last_name"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <RequiredLabel text="Email" />
              <InputGroup className="mb-3">
                <Form.Control
                  name="user_email"
                  value={userAllData["user_email"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <RequiredLabel text="Phone Number" />

              <div className="d-flex phoneContainer ">
                <PhoneInput disabled disableDropdown inputClass="phoneinput" enableSearch={true} onChange={(e) => setCCode(e)} country={"bd"} />
                <div className="w-100">
                  <Form.Control
                    name="user_mobile"
                    value={userAllData["user_mobile"]}
                    onChange={(e) => handleInputs(e, SetuserAllData)}
                    aria-label="Input number"
                    placeholder="Input number"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    className="phone_insert_input"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <RequiredLabel text={'Blood Group'}/>
              {/* <p></p> */}
              <InputGroup className="mb-3" placeholder="AB+">
                <Form.Control
                  placeholder="Add Blood Group"
                  aria-label="AB+"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  name="user_blood_group"
                  value={userAllData["user_blood_group"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6 ">
              <RequiredLabel text="Password" />

              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  name="user_password"
                  value={userAllData["user_password"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <RequiredLabel text="Role" />

              <div className="inputgroup_container">
                {/* <Form.Select style={{ backgroundColor: "#FAFAFA" }} aria-label="Text input with dropdown button">
                  <option className="disabled">--select--</option>
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>Author</option>
                </Form.Select>
                <div className="input_btn"></div> */}

                
                {/* <SelectDropDown  options={RoleList && RoleList} setSelectedOptionCategory={setSelectedOptionRole} /> */}

                {/* <Select  placeholder="---Select---" onChange={(e)=>setSelectedOptionRole(e.target.value)}   options={RoleList && RoleList} /> */}
                <Select  placeholder="---Select---" onChange={getSelectRole}   options={RoleList && RoleList} />
              </div>
            </div>
            <div className="col-12 col-md-6 d-none">{/* "Empty" */}</div>
            <div className="col-12 col-md-6 gender_Container mt-3">
              <RequiredLabel text={'Gender'}/>
              {/* <p></p> */}
              <div className="row">
                <div className="col-4 col-sm-12 d-flex align-items-center gender_item_container">
                  <input
                    class=" black_input userRadiobtn mb-2 form-check-input2"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={gender === 0}
                    onChange={(e) => e.target.value && true && setGender(0)}
                  />
                  {/* <input
                    className=" black_input userRadiobtn mb-2"
                    type="radio"
                    value="option1"
                  /> */}
                  <label className=" userRadioLabel mt-1" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="col-4 col-sm-12 d-flex align-items-center gender_item_container">
                  <input
                    class=" black_input userRadiobtn mb-2 form-check-input2"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={gender === 1}
                    onChange={(e) => e.target.value && true && setGender(1)}
                  />
                  {/* <input
                    className="black_input  userRadiobtn  mb-2"
                    type="radio"
                    value="option2"
                  /> */}
                  <label className="userRadioLabel mt-1" for="inlineRadio2">
                    Female
                  </label>
                </div>
                <div className="col-4 col-sm-12 d-flex align-items-center gender_item_container">
                  <input
                    class=" black_input userRadiobtn mb-2 form-check-input2"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    checked={gender === 2}
                    onChange={(e) => e.target.value && true && setGender(2)}
                  />
                  {/* <input
                    className="black_input  userRadiobtn  mb-2"
                    type="radio"
                    value="option3"
                  /> */}
                  <label className=" userRadioLabel mt-1" for="inlineRadio3">
                    Other
                  </label>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 d-none">
              <RequiredLabel text="Group" />

              <div className="inputgroup_container">
                {/* <Form.Select style={{ backgroundColor: "#FAFAFA" }} placeholder="---Select---" aria-label="Text input with dropdown button">
                  <option className="disabled">--select--</option>
                  <option>Group 1</option>
                  <option>Group 2</option>
                  <option>Group 3</option>
                </Form.Select>
                <div className="input_btn"></div> */}
                <SelectDropDown options={GroupList && GroupList} setSelectedOptionCategory={setSelectedOptionGroup} />
              </div>
            </div>

            <div className=" my-1 bg-white cat-child" style={{ border: "none!important" }}>
              <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-5 ">
                  <h5 style={{ marginTop: "30px" }}>Profile image *</h5>
                  <p style={{ color: "#8E8E93" }}>( Select your file & uploded )</p>
                  <div
                    className="w-100 browse-main d-flex align-items-center"
                    style={{
                      height: "55px",
                      border: "1px solid #E0E0E0",
                      borderRadius: "7px",
                    }}
                  >
                    {fileName === "" ? (
                      <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                        No File Choosen
                      </p>
                    ) : (
                      <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                        {" "}
                        {fileName}
                      </p>
                    )}

                    <div className="file-up">
                      <input type="file" onChange={(e) => fileHandle(e)} />
                      <p>Browse</p>
                    </div>
                  </div>
                  {URL && (
                    <div className="my-2">
                      <img height={90} width={90} src={URL} alt="" /> <br />
                      <button onClick={removeImg} className="remove-btn btn btn-small mt-1  rounded" style={{ border: "1px solid gray !important" }}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* ----------status--------- */}
                <div className="col-12 col-lg-5">
                  <h5 style={{ marginTop: "30px" }}>Status</h5>
                  <p style={{ color: "#8E8E93" }}>( If the Category Option is available )</p>
                  <div className="row mr-4">
                    <div
                      className=" d-flex justify-content-between col-12 py-3"
                      style={{
                        backgroundColor: "#F2F2F7",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="d-flex w-100">
                        <div
                          className="d-flex py-1 justify-content-center align-items-center"
                          style={{
                            backgroundColor: "#212121",
                            width: "32px",
                            height: "32",
                            borderRadius: "3px",
                          }}
                        >
                          <Eye size={20} color={"white"} />{" "}
                        </div>
                        <span className="mx-3">{status === true ? "ON" : "OFF"}</span>
                      </div>

                      <div class="form-check form-switch ">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          width={40}
                          height={40}
                          checked={status}
                          // onChange={(e) => setStatus(e.target.value)}
                          // onChange={(e) => console.log(e.target.value)}
                          onChange={()=>setStatus(!status)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 mt-md-4" style={{ marginLeft: "-10px" }}>
                  <button className="save-btn me-2 mt-2" style={{ background: "#000", color: "white" }} onClick={postUser}>
                    Save
                  </button>
                  <button onClick={handleCancelButton} className="save-btn mt-2">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

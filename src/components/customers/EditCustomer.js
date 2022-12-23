import axios from "axios";
import { Eye } from "phosphor-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import PhoneInput from "react-phone-input-2";
import { useHistory, useParams } from "react-router-dom";
import { handleInputs } from "../../utils/HandleInputs";
import { showToast } from "../../utils/ToastHelper";
import { BASE_URL } from "../Const/Url";
import Loader from "../CustomCommons/Loader";
import RequiredLabel from "../CustomCommons/RequiredLabel";
import * as path from "../Routes/RoutePaths";

const EditCustomer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading,setIsLoading] = useState(true)
  const [singleCustomer, setSingleCustomer] = useState({});
  const [cCode, setCCode] = useState("880");
  const [status, setStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [URL, setURL] = useState("");
  const [Categoryswitch, setCategoryswitch] = useState(true);
  const [userAllData, SetuserAllData] = useState({
    name: "",
    customer_email: "",
    customer_mobile: "",
    customer_address: "",
    total_purchase: "",
  });
  const toggleSwitch = () => {
    setCategoryswitch((current) => !current);
  };
  const fileHandle = (e) => {
    // setProfileImage(e.target.files[0]);
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
  const removeImg = () => {
    setStatus(!status);
  };
  // console.log(userAllData,'--------------user all data-----------')

  const getSingleUser = () => {
    const url = `${BASE_URL}api/v1/inventory/customer/${id}/`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.status) {
          setSingleCustomer(res.data.data);
          console.log(res.data.data, "--------------customer------------");
          //   setProfileImage(res.data.data.image)
          setStatus(res.data.data?.status);
          SetuserAllData({
            name: res.data.data.name,
            customer_email: res.data.data.email,
            customer_mobile: res.data.data.mobile.replace("+880", ""),
            total_purchase: res.data.data.total_purchase,
            customer_address: res.data.data.address,
          });
          setCategoryswitch(res.data.data.status);
          setIsLoading(false)
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        console.log(errorMsg);
      });
  };
// hlw----------------------------
  const updateCustomer = () => {
    const url = `${BASE_URL}api/v1/inventory/customer/${id}/`;
    const phone =`${cCode}${userAllData["customer_mobile"]}`
    const data = new FormData();
    data.append("name", userAllData["name"]);
    data.append("email", userAllData["customer_email"]);
    data.append("mobile", `+${cCode}${userAllData["customer_mobile"]}`);
    data.append("address", userAllData["customer_address"]);
    axios
      .patch(url, data)
      .then((res) => {
        if (res.data.status) {
          // clearData();
          showToast("success", "Customer Updated.");
          history.push(path.customer_list);
          // history.push(path.user_list);
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        console.log(errorMsg);
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        showToast("error", message);
      });
  };
  useEffect(() => {
    getSingleUser();
  }, []);

  if(isLoading){
    return <Loader/>
  }
  return (
    <div
      className="side_components_container"
      style={{ background: "#FAFAFA", minHeight: "100vh" }}
    >
      <div className="bg-white ">
        <div
          className="d-flex align-items-center"
          style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}
        >
          {/* <PlusCircle size={30} /> */}
          <h3 style={{ fontSize: "23px", marginTop: "6px" }}>Edit Customer</h3>
        </div>

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
              {/* <RequiredLabel text=" Name" /> */}
              <p>Name</p>
              <InputGroup className="mb-3">
                <Form.Control
                  name="name"
                  value={userAllData["name"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">
              {/* <RequiredLabel text="" /> */}
              <p>Email</p>
              <InputGroup className="mb-3">
                <Form.Control
                  name="customer_email"
                  value={userAllData["customer_email"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              {/* <RequiredLabel text="" /> */}
              <p>Phone Number</p>

              <div className="d-flex phoneContainer ">
                <PhoneInput
                  inputClass="phoneinput"
                  enableSearch={true}
                  onChange={(e) => console.log(setCCode(e))}
                  country={"bd"}
                />
                <div className="w-100">
                  <Form.Control
                    name="customer_mobile"
                   
                    value={userAllData["customer_mobile"]}
                    // onChange={(e) => handleInputs(e, SetuserAllData)}
                    aria-label="Input number"
                    placeholder="Input number"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    className=" disabled"
                    // className="phone_insert_input disabled"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              {/* <RequiredLabel text="" /> */}
              <p>Address</p>
              <InputGroup className="mb-3">
                <Form.Control
                  name="customer_address"
                  value={userAllData["customer_address"]}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              {/* <RequiredLabel text="" /> */}
              <p>Total Purchesed</p>
              <InputGroup className="mb-3 disabled">
                <Form.Control
                  name="total_purchase"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  disabled
                  value={`${userAllData["total_purchase"]} (not editable)`}
                  onChange={(e) => handleInputs(e, SetuserAllData)}
                />
              </InputGroup>
            </div>

            {/* --------------- */}
            <div className="row d-flex justify-content-between ">
              <div className="col-12 col-lg-5 d-none">
                <h5 style={{ marginTop: "30px" }}>Profile image</h5>
                <p style={{ color: "#8E8E93" }}>
                  ( Select your file & uploded )
                </p>
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
                    <button
                      onClick={removeImg}
                      className="remove-btn btn btn-small mt-1  rounded"
                      style={{ border: "1px solid gray !important" }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* ----------status--------- */}
              <div className="col-12 col-lg-5 d-none">
                <h5 style={{ marginTop: "30px" }}>Status</h5>
                <p style={{ color: "#8E8E93" }}>
                  ( If the Category Option is available )
                </p>
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
                      <span className="mx-3">
                        {Categoryswitch ? "ON" : "OFF"}
                      </span>
                    </div>

                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        width={40}
                        height={40}
                        name="category_active"
                        checked={Categoryswitch}
                        onClick={toggleSwitch}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 mt-md-4" style={{ marginLeft: "-10px" }}>
                <button
                  className="save-btn me-2 mt-2"
                  style={{ background: "#000", color: "white" }}
                  onClick={updateCustomer}
                >
                  Save
                </button>
                <button onClick={()=>history.push(path.customer_list)} className="save-btn mt-2">Cancel</button>
              </div>
            </div>
            {/* --------------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;

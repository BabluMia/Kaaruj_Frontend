import { Eye, PlusCircle } from "phosphor-react";
import React from "react";
import { Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import "./css/user.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
const AddUser = () => {
  const [phone, setphone] = useState(1);
  const [fileName, setFileName] = useState("");
  const [optional, setOptional] = useState("");
  const [URL, setURL] = useState("");
  const fileHandle = (e) => {
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
  return (
    <div className="side_components_container">
      <div className="bg-white ">
        <div className="d-flex align-items-center" style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}>
          <PlusCircle size={30} />
          <h3 style={{ fontSize: "23px", marginTop: "6px", marginLeft: "12px" }}>Add New User</h3>
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
              <p>
                First Name<span className="star">*</span>{" "}
              </p>
              <InputGroup className="mb-3">
                <Form.Control aria-label="Username" aria-describedby="basic-addon1" style={{ backgroundColor: "#FAFAFA" }} />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">
              <p>
                Last Name<span className="star">*</span>{" "}
              </p>
              <InputGroup className="mb-3">
                <Form.Control aria-label="Username" aria-describedby="basic-addon1" style={{ backgroundColor: "#FAFAFA" }} />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <p>
                Email<span className="star">*</span>
              </p>
              <InputGroup className="mb-3">
                <Form.Control aria-label="Username" aria-describedby="basic-addon1" style={{ backgroundColor: "#FAFAFA" }} />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <p>
                Phone Number <span className="star">*</span>
              </p>
              <div className="d-flex phoneContainer ">
                <PhoneInput inputClass="phoneinput" enableSearch={true} country={"us"} />
                <div className="w-100">
                  <Form.Control
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
              <p>Gender</p>
              <div className="row">
                <div className="col-4 d-flex align-items-center w-25">
                  <input className=" black_input userRadiobtn mb-2" type="radio" value="option1" />
                  <label className=" userRadioLabel" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="col-4 d-flex align-items-center w-25">
                  <input className="black_input  userRadiobtn  mb-2" type="radio" value="option2" />
                  <label className="userRadioLabel" for="inlineRadio2">
                    Female
                  </label>
                </div>
                <div className="col-4 d-flex align-items-center w-25">
                  <input className="black_input  userRadiobtn  mb-2" type="radio" value="option3" />
                  <label className=" userRadioLabel" for="inlineRadio3">
                    Other
                  </label>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <p>Blood Group</p>
              <InputGroup className="mb-3" placeholder="AB+">
                <Form.Control placeholder="AB+" aria-label="AB+" aria-describedby="basic-addon1" style={{ backgroundColor: "#FAFAFA" }} />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <p>
                Role<span className="star">*</span>
              </p>
              <div className="inputgroup_container">
                <Form.Select style={{ backgroundColor: "#FAFAFA" }} aria-label="Text input with dropdown button">
                  <option className="disabled">--select--</option>
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>Author</option>
                </Form.Select>
                <div className="input_btn"></div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <p>
                Group<span className="star">*</span>
              </p>
              <div className="inputgroup_container">
                <Form.Select style={{ backgroundColor: "#FAFAFA" }} placeholder="---Select---" aria-label="Text input with dropdown button">
                  <option className="disabled">--select--</option>
                  <option>Group 1</option>
                  <option>Group 2</option>
                  <option>Group 3</option>
                </Form.Select>
                <div className="input_btn"></div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <p>
                Password<span className="star">*</span>
              </p>
              <InputGroup className="mb-3">
                <Form.Control aria-label="Username" aria-describedby="basic-addon1" style={{ backgroundColor: "#FAFAFA" }} />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">{/* "Empty" */}</div>

            <div className=" my-1 bg-white cat-child" style={{ border: "none!important" }}>
              <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-5 ">
                  <h5 style={{ marginTop: "30px" }}>Profile image</h5>
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
                      <img height={90} width={90} src={URL} alt="" />
                    </div>
                  )}
                </div>

                {/* ----------status--------- */}
                <div className="col-12 col-lg-5">
                  <h5 style={{ marginTop: "30px" }}>Status</h5>
                  <p style={{ color: "#8E8E93" }}>( If the Category Option is available )</p>
                  <div className="row mr-4">
                    <div className=" d-flex justify-content-between col-12 py-3" style={{ backgroundColor: "#F2F2F7", borderRadius: "8px" }}>
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
                        <span className="mx-3">OFF</span>
                      </div>

                      <div class="form-check form-switch ">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          width={40}
                          height={40}
                          onChange={(e) => console.log(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 mt-md-4" style={{ marginLeft: "-10px" }}>
                  <button className="save-btn me-2 mt-2">Save</button>
                  <button className="save-btn mt-2">Cancel</button>
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

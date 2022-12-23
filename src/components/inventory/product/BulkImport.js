import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { showToast } from "../../../utils/ToastHelper";
import { BASE_URL } from "../../Const/Url";
import RequiredLabel from "../../CustomCommons/RequiredLabel";
import down from "./../../../assets/Icon/down.svg";
import demoCsv from "./files/demo.csv";
import demoBulk from "./files/BulkDemoFile.xlsx";
import * as path from "./../../Routes/RoutePaths";
import swal from "sweetalert";
import Loader from "../../CustomCommons/Loader";
import ClockLoader from "react-spinners/ClockLoader";
import LoaderClock from "../../CustomCommons/LoaderClock";

const BulkImport = () => {
  const [fileName, setFileName] = useState(null);
  const [name, setName] = useState(null);
  const fileReader = new FileReader();
  const history = useHistory();
  const [isLoading, SetisLoading] = useState(false);
  const fileHandle = (e) => {
    setFileName(e.target.files[0]);
    setName(e.target.files[0].name);
    // console.log(e.target.files[0]);
  };
  const url = `${BASE_URL}api/v1/inventory/bulk-import/`;

  const dataSubmit = () => {
    SetisLoading(true);
    const from = new FormData();
    const file = fileName;
    console.log(file);
    const reader = new FileReader();
    reader.onload = function (event) {
      const csvOutput = event.target.result;
      console.log(csvOutput);
      setFileName(csvOutput);
    };
    fileReader.readAsText(file);
    from.append("file", fileName);
    axios
      .post(url, from)
      .then((res) => {
        if (res.data.status) {
          showToast("success", "Products Added.");
          SetisLoading(false);
          history.push(path.product_list);
        }
      })
      .catch((err) => {
        //   const message = JSON.parse(err.request.response).message;
        //   const errorMsg = JSON.parse(err.request.response).errors;
        //   for (let value of Object.values(errorMsg)) {
        //     showToast("error", value[0]);
        //   }
        //   showToast("error", message);
        // });
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        const errorMsgForuser = errorMsg?.msg;
        console.log("errorMsg", errorMsg);
        var errors = "Please,Try again,after Solving this errors: \n \n ";
        for (let key in errorMsg) {
          errors += errorMsg[key];
          errors += "\n";
          errors += "\n";
        }
        SetisLoading(false);

        swal({
          icon: "error",
          // text: `${errorMsg[key] === 'File is not a zip file' ? 'Only Exel file supported!' : errorMsg[key]}`
          text: errors,
        });
        // showToast("error", message);
      });
  };
  if (isLoading) {
    return <Loader/>
  }
  return (
    <div className="categorey-parent pd-right" style={{ height: "100vh", background: "#FAFAFA" }}>
      <div className="bg-white mb-3">
        <div className="" style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}>
          <h3 className="head-tag" style={{ marginBottom: "20px" }}>
            Instruction
          </h3>
          <div className="inst mb-4" style={{ color: "#828282" }}>
            <p className="my-2">1. Download the format and fill it with proper data.</p>
            <p className="my-2">2. You can download the example file to understand how to data must be filed.</p>
            <p className="my-2">3. Onece you have downloaded and filed the format it in the form below and submit.</p>
            <p className="my-2">4. After uploading product you need to edit them and save product image and choice.</p>
            <p className="my-2">5. You can get category and sub category id from their list please input the right id.</p>
          </div>
        </div>
      </div>

      {/* ======import=========== */}
      <div className="bg-white">
        {/* <form action="" onSubmit={(e) => dataSubmit(e)}> */}
        <div className="d-flex align-items-center justify-content-between side-pd" style={{ border: "0.5px solid #E0E0E0" }}>
          <h3 className="h5-head" style={{ marginTop: "6px", marginLeft: "12px" }}>
            Import Product File
          </h3>
          <Link
            to={demoBulk}
            target="_blank"
            download
            style={{ border: "0", outline: "none" }}
            className="d-flex btn-text px-1 px-md-3 py-2  align-items-center bg-dark text-white"
          >
            <img className="me-1 format-img" src={down} alt="" /> Download Format
          </Link>
        </div>
        <div className=" side-pd bord">
          {/* <p> *</p> */}
          <RequiredLabel text={"File"} />
          <div className="row">
            <div className="col-11 col-lg-4 col-md-6">
              <div
                className="w-100 browse-main d-flex align-items-center"
                style={{
                  height: "55px",
                  border: "1px solid #E0E0E0",
                  borderRadius: "7px",
                  overflowX: "hidden",
                }}
              >
                {name === "" || null ? (
                  <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                    No File Choosen
                  </p>
                ) : (
                  <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                    {" "}
                    {name}
                  </p>
                )}

                <div className="file-up">
                  <input accept={".csv"} type="file" onChange={fileHandle} />
                  <p>Browse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" side-pd bord">
          <button onClick={dataSubmit} className="save-btn me-2 mt-2" style={{ background: "#000", color: "white" }}>
            Save
          </button>
          {/* <input
              type="submit"
              value={"Save"}
              className="save-btn me-2 mt-2"
              style={{ background: "#000", color: "white" }}
            /> */}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default BulkImport;

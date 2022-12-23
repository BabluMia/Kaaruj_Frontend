import React, { useEffect, useState } from "react";
import qrCode from "../../assets/Icon/qrcode.svg";
import zakaria from "../../assets/Icon/Zakariya Rahman.svg";
import shafin from "../../assets/Icon/Shafin Ahmed.svg";
import print from "../../assets/Icon/print.svg";
import send from "../../assets/Icon/send.svg";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Const/Url.js";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import Loader from "../CustomCommons/Loader";
import cImg from "../../assets/Icon/KAARUJ 1.png";
import { showToast } from "../../utils/ToastHelper";
import * as path from "./../Routes/RoutePaths";

const ViewInvoice = () => {
  const { id } = useParams();
  const [isLoading, SetisLoading] = useState(true);
  let url = `${BASE_URL}api/v1/sales/invoice/${id}`;
  const [data, setData] = useState({});
  const [Jdata, setJData] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data, "---------single invoice---------");
        // console.log(res.data.data.product_list_json);
        const temp1 = res.data.data.product_list_json.mainstate;
        var output = [];
        for (let i in temp1) {
          console.log(temp1[i]["variantObj"]);
          for (let j in temp1[i]["variantObj"]) {
            console.log(j);
            console.log(temp1[i]["variantObj"][j]);
            const d = temp1[i]["variantObj"][j];
            d.total !== 0 &&
              output.push({
                name: i,
                basePrice: temp1[i].price,
                discount: temp1[i].discount,
                thumb: temp1[i].thumb,
                price: d["price"],
                quantity: d["quantity"],
                id: d["id"],
                total: d["total"],
                variant: d["name"],
              });
          }
        }
        setJData(output);
        SetisLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  }, []);
  console.log("Jdata", Jdata);
  const paymentStatus = ["Paid", "Unpaid", "Due"];
  const DeliveryTypeStatus = ["Regular", "Urgent"];

  const cRef = useRef();
  const history = useHistory();

  const HandlePrint = useReactToPrint({
    content: () => cRef.current,
    documentTitle: "emp-data",
    // onAfterPrint: () => swal("Printed"),
    bodyClass: "dis",
  });
  const handlePrints = () => {
    HandlePrint();
  };
  var options = {
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: 'numeric', minute: 'numeric', hour12: true
  };

  const sendPdfToEmail = () => {
    const url = `${BASE_URL}api/v1/sales/invoice/${id}/`;
    const data = new FormData();
    data.append("send_pdf", true);
    SetisLoading(true);
    axios
      .patch(url, data)
      .then((res) => {
        console.log("calling api");
        SetisLoading(false);
        showToast("success", "Invoice sent successfully..");
        history.push(path.invoice_list);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        showToast("error", message);
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  console.log(
    data.payment_status,
    "----------------------status--------------"
  );
  const paymentType = ["C.O.D", "Card", "Bank Transfer", "bKash"];

  return (
    <div className="categorey-parent pd-right2" style={{ height: "100%" }}>
      <div className="bg-white rounded printe" ref={cRef}>
        <div className="comoany-img ">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <img width={200} className="mt-4" height={40} src={cImg} alt="" />
          </div>
        </div>
        <div className=" row py-4 px-lg-4 px-md-3 px-3 top-m ds-topm">
          {/* d-flex flex-column flex-md-row justify-content-between */}
          <div className="col-6 view-inv dd col-md-6 mb-2 mb-md-0">
            <div>
              <h4 className="mt-1">#{data.number}</h4>
              <div className="mt-2">
                <span>Status:</span>{" "}
                <span
                // className={`px-2 py-1 rounded  text-white ${
                //   (data.payment_status === 0 && "i1") ||
                //   (data.payment_status === 1 && "c4 text-white") ||
                //   (data.payment_status === 2 && "c3 text-white")
                // }`}
                >
                  {paymentStatus[data.payment_status]}
                </span>
              </div>
              <div className="mt-2">
                <span>Delivery:</span>{" "}
                <span>{DeliveryTypeStatus[data.delivery_type]}</span>
              </div>
              <div className="mt-2">
                <span>Payment Type:</span>{" "}
                <span>{paymentType[data?.payment_type]}</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex   justify-content-end  align-items-start gap-2 invoice_qr extra-inv">
            <div>
              <span>Invoice Date: </span>
              <br />
              <span>
                {new Date(data.invoice_date).toLocaleDateString(
                  "en-US",
                  options
                )}
              </span>
              {/* {new Date(data.invoice_date).toLocaleDateString("en-US", options)} */}
              <br />
              {/* <span style={{ marginRight: "4px" }}> Due Date: </span> <span>22 June, 2022</span> */}
            </div>
            <img
              className="pointer"
              style={{ marginTop: "-10px" }}
              src={data?.qr_code ? data.qr_code : qrCode}
              alt=""
            />
          </div>
        </div>
        {/* border */}
        <div className="mx-2 mx-md-3 ">
          <div className="border-ex"></div>
        </div>
        {/* address */}
        <div className="address">
          <div className="row  justify-content-between an">
            <div className="col-12 col-md-6 col-lg-5">
              <h5>From:</h5>
              <span>
                {data?.bill_from ? data?.bill_from : "Zakariya Rahman"}{" "}
              </span>{" "}
              <br />
              <span>
                {data?.from_address
                  ? data?.from_address
                  : "Zoo Road, Mirpur,Dhaka, Bangladesh"}{" "}
              </span>{" "}
              <br />
              {/* <span>Dhaka, Bangladesh</span> <br /> */}
              <span>
                Phone: {data?.from_mobile ? data?.from_mobile : "+4480976645"}
              </span>{" "}
              <br />
              <span>Email: {data.from_email}</span>
            </div>
            <div className="col-12 col-md-6 col-lg-5 mt-3 mt-md-0 ddd">
              <h5>To:</h5>
              <span>
                {data?.bill_to ? data?.bill_to : "Zakariya Rahman"}{" "}
              </span>{" "}
              <br />
              <span>
                {data.to_address === "undefined" || ""
                  ? "Zoo Road, Mirpur,Dhaka, Bangladesh"
                  : data.to_address}
              </span>{" "}
              <br />
              {/* <span>Dhaka, Bangladesh</span> <br /> */}
              <span>
                Phone: {data?.to_mobile ? data?.to_mobile : "+4480976645"}
              </span>{" "}
              <br />
              {
                data?.to_email && <span>Email:{data.to_email}</span>
              }
              
            </div>
          </div>
          <div className="table-cont">
            <h5 className="mb-4">Order Summary</h5>
            <div className="table-responsive">
              <table className="w w1" style={{ width: "100%" }}>
                <thead>
                  <tr className="bg-dark text-white" style={{ height: "50px" }}>
                    <th className="ps-4" style={{ minWidth: "80px" }}>
                      No
                    </th>
                    <th className="minw minw1" style={{ minWidth: "150px" }}>
                      Item
                    </th>
                    <th className="minw minw1 ps-2">Image</th>

                    <th className="minw minw1 ">
                      <p className="text-center my-auto">Price</p>
                    </th>
                    <th className="minw minw1 ">
                      <p className="text-center my-auto">Quantity</p>
                    </th>
                    <th
                      className="pe-4"
                      style={{ minWidth: "230px", textAlign: "right" }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // Object.keys(temp0).map(name=>temp0[name]["variantObj"]).map(curr=>Object.values(curr))
                  }
                  {Jdata !== undefined &&
                    Jdata !== null &&
                    Jdata.map((curr, index) => {
                      return (
                        <tr className="tab-b" style={{ height: "50px" }}>
                          <td className="ps-4">{index + 1}</td>
                          <td>
                            {curr.name} ({curr.variant})
                          </td>
                          <td className="ps-2">
                            <img
                              className="rounded"
                              width={40}
                              height={40}
                              src={curr?.thumb}
                              alt=""
                            />
                          </td>
                          <td>
                            <p className="text-center my-auto">
                              ৳{" "}
                              {curr?.discount === 0
                                ? parseInt(curr?.basePrice) +
                                  parseInt(curr?.price)
                                : parseInt(curr?.discount) +
                                  parseInt(curr.price)}
                            </p>
                          </td>

                          <td>
                            <p className="text-center my-auto">
                              {curr?.quantity}
                            </p>
                          </td>
                          <td>
                            <div className="d-flex justify-content-end me-3">
                              ৳ {curr.total}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="row d4 d5 ">
              <div className="col-12 col-md-4 col-lg-6"></div>
              <div className="col-12 col-md-8 col-lg-6 d-flex justify-content-end ">
                <div className="table-responsive">
                  <table>
                    <tbody>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td
                          style={{ minWidth: "230px" }}
                          className="tab-b ps-3"
                        >
                          <div
                            style={{ marginRight: "14px" }}
                            className="d-flex justify-content-between "
                          >
                            <div>Sub Total : </div>
                            <div>
                              ৳{" "}
                              {Jdata.map((curr) => curr.total).reduce(
                                (a, b) => a + b,
                                0
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div
                            style={{ marginRight: "14px" }}
                            className="d-flex justify-content-between "
                          >
                            <div>Delivery Charge : </div>
                            <div>
                              ৳{" "}
                              {data.delivery_charge_type === 0
                                ? "80.00"
                                : "150.00"}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div
                            style={{ marginRight: "14px" }}
                            className="d-flex justify-content-between "
                          >
                            <div>Discount : </div>
                            <div>৳ {data.total_discount}</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div
                            style={{ marginRight: "14px" }}
                            className="d-flex justify-content-between "
                          >
                            <div>Total : </div>
                            <div>৳ {data.total_amount}</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div
                            style={{ marginRight: "14px" }}
                            className="d-flex justify-content-between "
                          >
                            <div>Paid Amount: </div>
                            <div>৳ {data?.total_paid}</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div
                            style={{ marginRight: "14px" }}
                            className="d-flex justify-content-between "
                          >
                            <div>Due Amount : </div>
                            <div style={{ color: "red" }}>
                              ৳ {data.total_due}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="mx-2 mx-md-3 ">
          <div className="border-ex"></div>
        </div>

        <div className="my-4 table-cont address mt-4">
          <p style={{ fontSize: "19px" }} className="dt">
            {data.notes}
          </p>
        </div>
      </div>
      <div className=" invoice-button">
        <button className="me-2 my-2 button-1" onClick={handlePrints}>
          <img src={print} alt="" /> Print
        </button>
        <button
          onClick={sendPdfToEmail}
          className={`my-2 button-2 ${!data.to_email && "d-none"}`}
        >
          <img src={send} alt="" /> Send Invoice
        </button>
      </div>
    </div>
  );
};

export default ViewInvoice;

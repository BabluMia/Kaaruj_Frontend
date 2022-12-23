import React, { useEffect, useState } from "react";
import zakaria from "../../assets/Icon/Zakariya Rahman.svg";
import shafin from "../../assets/Icon/Shafin Ahmed.svg";
import cImg from "../../assets/Icon/KAARUJ 1.png";
import demoBarCode from "../../assets/Icon/demo-barcode.png";
import Loader from "../CustomCommons/Loader";

const PreviewCreate =({ print, Found, InvoiceAllData, status, FoundCustomer,Jdata, mainState, invStatus }) => {
  // console.log(Found, "--------found------");
  // console.log(InvoiceAllData, "--------InvoiceAllData found------");
  // const [Jdata, setJData] = useState([]);
  // useEffect(() => {
  //   let temp1 = mainState;
  //   console.log(temp1, "--------mainState found temp1------");

  //   var output = [];
  //   for (let i in temp1) {
  //     console.log(temp1[i]["variantObj"]);
  //     for (let j in temp1[i]["variantObj"]) {
  //       console.log(j);
  //       console.log(temp1[i]["variantObj"][j]);
  //       const d = temp1[i]["variantObj"][j];
  //       d.total !== 0 &&
  //         output.push({
  //           name: i,
  //           basePrice: temp1[i].price,
  //           thumb: temp1[i].thumb,
  //           discount: temp1[i].discount,
  //           price: d["price"],
  //           quantity: d["quantity"],
  //           id: d["id"],
  //           total: d["total"],
  //           variant: d["name"],
  //         });
  //     }
  //   }
  //   setJData(output);
  // }, []);


  var options = {
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: 'numeric', minute: 'numeric', hour12: true
  };
  //
  // if(Jdata.length<=0){
  //   return <Loader/>
  // }
  return (
    <div ref={print}>
      <div className="bg-white rounded printe">
        <div className=" row py-4 px-lg-4 px-md-3 px-3 ">
          <div className="comoany-img ">
            <div className="w-100 d-flex justify-content-center align-items-center">
              <img width={200} className="mt-4" height={40} src={cImg} alt="" />
            </div>
          </div>
          {/* d-flex flex-column flex-md-row justify-content-between */}
          <div className="col-6 dd col-md-6 mb-2 mb-md-0">
            <div style={{ marginTop: "-45px" }}>
              <h4 className="mt-1">#INV24567</h4>
              <div className="mt-2">
                <span>Status: </span>{" "}
                <span style={{ backgroundColor: "#27AE60" }} className="px-2 py-1 rounded  text-white">
                  {invStatus ? invStatus.label : "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end  align-items-start gap-2 qr">
            <div>
              <span>Issue Date: </span> <br /> <span>{new Date(InvoiceAllData?.invoice_date).toLocaleDateString("en-US", options)}</span>
              <br />
              {/* <span style={{ marginRight: "4px" }}> Due Date: </span>{" "}
              <span>22 June, 2022</span> */}
            </div>
            <img src={InvoiceAllData?.barcode ? InvoiceAllData?.barcode : demoBarCode} alt="" />
          </div>
        </div>
        <div className="address">
          <div className="row  justify-content-between an">
            <div className="col-12 col-md-6 col-lg-5">
              <h5>From:</h5>
              <span>
                {InvoiceAllData["invoice_bill_from"] ? InvoiceAllData["invoice_bill_from"] : '"Zakariya Rahman"'}
                {}{" "}
              </span>{" "}
              <br />
              <span>{InvoiceAllData["invoice_from_address"]} </span> <br />
              {/* <span>Dhaka, Bangladesh</span> <br /> */}
              <span>Phone:{InvoiceAllData["invoice_from_mobile"] ? `+880${InvoiceAllData["invoice_from_mobile"]}` : "+4480976645"}</span> <br />
              <span>Email: {"demo@gmail.com"}</span>
            </div>
            <div className="col-12 col-md-6 col-lg-5 mt-3 mt-md-0 ddd me-4">
              <h5>To:</h5>
              <span>{Found ? FoundCustomer.name : InvoiceAllData["invoice_bill_to"] || "Not Added"} </span> <br />
              <span>{Found ? FoundCustomer.address : InvoiceAllData["invoice_to_address"] || "Dhaka ,Bangladesh"}</span> <br />
              {/* <span>Dhaka, Bangladesh</span> <br /> */}
              <span>Phone: {InvoiceAllData["invoice_to_mobile"] ? `+880${InvoiceAllData["invoice_to_mobile"]}` : "+4480976645"}</span> <br />
              <span>Email:{Found ? FoundCustomer.email : InvoiceAllData["invoice_to_email"] || "Not Added"}</span>
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
                      Image
                    </th>
                    <th className="minw minw1">Item</th>

                    <th className="minw minw1 ">
                      <p className="text-center my-auto">Price</p>
                    </th>
                    <th className="minw minw1 ">
                      <p className="text-center my-auto">Quantity</p>
                    </th>
                    <th className="pe-4" style={{ minWidth: "230px", textAlign: "right" }}>
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
                          <td>
                            <img className="rounded" width={40} height={40} src={curr?.thumb} alt="" />
                          </td>
                          <td>৳ {curr?.discount === 0 ? parseInt(curr?.basePrice) + parseInt(curr?.price) : curr?.discount}</td>
                          <td>
                            <p className="text-start my-auto">৳ {curr?.quantity}</p>
                          </td>
                          <td>
                            <div className="d-flex justify-content-end me-3">৳ {curr.total}</div>
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
                        <td style={{ minWidth: "230px" }} className="tab-b ps-3">
                          <div style={{ marginRight: "14px" }} className="d-flex justify-content-between ">
                            <div>Sub Total : </div>
                            <div>
                              ৳000
                              {/* {Jdata.map((curr) => curr.total).reduce(
                                (a, b) => a + b,
                                0
                              )} */}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div style={{ marginRight: "14px" }} className="d-flex justify-content-between ">
                            <div>Delivery Charge : </div>
                            <div>৳000</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div style={{ marginRight: "14px" }} className="d-flex justify-content-between ">
                            <div>Total : </div>
                            <div>৳000</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="" style={{ height: "50px" }}>
                        <td className="ps-4"></td>
                        <td></td>
                        <td className="tab-b ps-3">
                          <div style={{ marginRight: "14px" }} className="d-flex justify-content-between ">
                            <div>Due Amount : </div>
                            <div style={{ color: "red" }}>৳000</div>
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

        <div className="my-4 table-cont address mt-4 d-none">
          <div className="row justify-content-between mt-4">
            <div className="col-4 text-center">
              <div>
                <h5
                  className="pb-3"
                  style={{
                    fontSize: "23px",
                    borderBottom: ".5px solid #BDBDBD",
                  }}
                >
                  Authority Signature
                </h5>
                <div className="my-2 d-flex justify-content-center">
                  <img className="signature_css" src={zakaria} alt="" />
                </div>
              </div>
            </div>
            <div className="col-4 text-center">
              <div>
                <h5
                  className="pb-3"
                  style={{
                    fontSize: "23px",
                    borderBottom: ".5px solid #BDBDBD",
                  }}
                >
                  {" "}
                  Client Signature
                </h5>
                <div className="my-2 d-flex justify-content-center">
                  <img className="signature_css" src={shafin} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCreate;

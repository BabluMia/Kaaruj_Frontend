import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import plus from "../../assets/Icon/plus.svg";
import catIcon from "../../assets/Icon/category icon.svg";
import productIcon from "../../assets/Icon/Product icon.svg";
import salesIcon from "../../assets/Icon/sales Icon.svg";
import invoiceIcon from "../../assets/Icon/invoice icon.svg";
import blueTime from "../../assets/Icon/blue time.svg";
import blueArrow from "../../assets/Icon/blue arrow.svg";
import AreaChart from "./AreaChart";
import ViewIcon from "../CustomCommons/ViewIcon";
import EditIcon from "../CustomCommons/EditIcon";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import * as path from "../Routes/RoutePaths";
import { BASE_URL } from "../Const/Url";
import axios from "axios";
import { deliveryStatus, paymentStatus } from "../Const/Status";
import { Cube } from "react-preloaders";
import UseData from "../Const/UseData";
import { HashLoader } from "react-spinners";
import Loader from "../CustomCommons/Loader";
import ReactPaginate from "react-paginate";
import NextIcon from "../CustomCommons/NextIcon";
import PreviousIcon from "../CustomCommons/PreviousIcon";
import CountUp from "react-countup";
import {
  can_change_invoice,
  can_delete_invoice,
  can_view_invoice,
  has_permissions,
} from "../CustomCommons/utils";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const [selectVal, setSelectVal] = useState("Lsat Week");
  const [dataDrop, setDataDrop] = useState(false);
  if (!localStorage.getItem("is_logged_in")) {
    history.push("/login/");
  }
  const categoreyData = [
    {
      id: 1,
      invoice: "INV3423759202",
      parentCategorey: "Food",
      categorey: "Food + Protein Shake",
      lastModi: "16/02/2022",
      status: "Paid",
      btnColour: "#219653",
      prepardBy: "Dianne Russell",
      vat: "30.00",
      total: "৳ 492.00",
      btnBg: "#219653",
      dStatus: "Deliverd",
    },
    {
      id: 2,
      invoice: "INV3423759290",
      parentCategorey: "Mashed Potatoes",
      categorey: "Mashed Potatoes",
      lastModi: "22/02/2022",
      status: "Paid",
      btnColour: "#219653",
      prepardBy: "Cameron Williamson",
      vat: "30.00",
      total: "৳ 1492.00",
      btnBg: "#219653",
      dStatus: "Deliverd",
    },
    {
      id: 3,
      invoice: "INV3423759273",
      parentCategorey: "Rice",
      categorey: "Rice",
      prepardBy: "Albert Flores",
      lastModi: "16/02/2022",
      status: "Paid",
      btnColour: "#219653",
      vat: "30.00",
      total: "৳ 592.00",
      btnBg: "#219653",
      dStatus: "Deliverd",
    },
    {
      id: 4,
      invoice: "INV3423759278",
      parentCategorey: "Protein Bar",
      categorey: "Protein Bar",
      lastModi: "16/02/2022",
      status: "Unpaid",
      btnColour: "red",
      prepardBy: "Theresa Webb",
      vat: "30.00",
      total: "৳ 2092.00",
      btnBg: "#FFCDD2",
      dStatus: "Processing",
    },
    {
      id: 5,
      invoice: "INV3423759234",
      parentCategorey: "Roast Chicken",
      categorey: "Roast Chicken",
      lastModi: "16/02/2022",
      status: "Paid",
      btnColour: "#219653",
      prepardBy: "Jenny Wilson",
      vat: "30.00",
      total: "৳ 1492.00",
      btnBg: "#219653",
      dStatus: "Deliverd",
    },
    {
      id: 6,
      invoice: "INV3423759298",
      parentCategorey: "Rice",
      categorey: "Rice",
      lastModi: "16/02/2022",
      status: "Paid",
      btnColour: "#219653",
      prepardBy: "Savannah Nguyen",
      vat: "30.00",
      total: "৳ 500.00",
      btnBg: "#219653",
      dStatus: "Deliverd",
    },
    {
      id: 7,
      invoice: "INV3423759242",
      parentCategorey: "Protein Bar",
      categorey: "Protein Bar",
      lastModi: "16/02/2022",
      status: "Unpaid",
      btnColour: "red",
      prepardBy: "Ronald Richards",
      vat: "30.00",
      total: "৳ 492.00",
      btnBg: "#FFCDD2",
      dStatus: "Processing",
    },
  ];
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;

  const [dashboardData, setDashboardData] = useState(categoreyData);
  const [dashboardCountData, setDashboardCountData] = useState({
    product: 0,
    invoice: 0,
    sales: 0,
    category: 0,
  });
  const [invoiceList, setInvoiceList] = useState([]);

  const [isLoading, SetisLoading] = useState(true);

  // const [data,loading] = UseData(`${BASE_URL}api/v1/sales/invoice/`)
  const getInvoiceList = () => {
    const url = `${BASE_URL}api/v1/sales/invoice/`;
    axios
      .get(url)
      .then((res) => {
        setInvoiceList(res.data.data.results);
        // console.log(res.data);
        SetisLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
        SetisLoading(false);
      });
  };
  useEffect(() => {
    getInvoiceList();
  }, []);

  
  const deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/sales/invoice/${id}`;
        axios
          .delete(url)
          .then(() => {
            // showToast("Delele", "Data Deleted");
            getInvoiceList();
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
  const keys = ["number", "total_amount", "prepared_by", "invoice_date"];
  const getData = invoiceList.filter((p) =>
    keys.some((key) => p[key].toString().toLowerCase().includes(query))
  );
  const pageCount = Math.ceil(getData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // const getData = invoiceList === undefined ? [] : invoiceList.filter((p) => keys.some((key) => p[key].toLowerCase().includes(query)));

  const select = ["Last Week", "Last Month", "Last Year"];
  const lastSelect = useRef();
  const handleSelect = () => {
    setDataDrop(!dataDrop);
  };
  useEffect(() => {
    const closeUser = (e) => {
      if (e.path[0] !== lastSelect.current) {
        // setDataDrop(1)
      }
    };
    document.body.addEventListener("click", closeUser);

    return () => document.body.removeEventListener("click", closeUser);
  }, []);
  // console.log(invoiceList, "-------list----------");

  const getDashboard = () => {
    const url = `${BASE_URL}api/v1/auth/dashboard/`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setDashboardCountData(res.data.data);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getDashboard();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  const invoice_choices = ["Paid", "Unpaid", "Due"];

  const delivery_choices = ["Processing", "Recieved", "Delivered"];
  const delivery_type_choices = ["Regular", "Urgent"];
  const paymentType = ["C.O.D", "Card", "Bank Transfer", "bKash"];

  return (
    <div>
      <div className="categorey-parent " style={{ height: "100%" }}>
        <div className="only-margin">
          {/* <Cube/> */}
          <div className="  stat-box-main">
            <div className=" state-main  mt-2 bg-white">
              <div className="state-img-box">
                <img src={catIcon} width={26} height={24} alt="" />
              </div>
              <div className="mx-4 mb-2">
                <p>Total Category</p>
                <h5 className="state-head">
                  <CountUp
                    end={
                      dashboardCountData.category !== undefined
                        ? dashboardCountData.category
                        : 1232
                    }
                    duration={1}
                  />
                </h5>
              </div>
            </div>
            {/* <div className=" state-main  mt-2 bg-white">
            <div className="state-img-box">
              <img src={productIcon} width={26} height={24} alt="" />
            </div>
            <div className="mx-4 mb-2">
              <p>Total Product</p>
              <h5 className="state-head">7,287 ৳</h5>
            </div>
          </div> */}
            <div className=" state-main  mt-2 bg-white">
              <div className="state-img-box">
                <img src={productIcon} width={26} height={24} alt="" />
              </div>
              <div className="mx-4 mb-2">
                <p>Total Product</p>
                <h5 className="state-head">
                  <CountUp
                    end={
                      dashboardCountData.product !== undefined
                        ? dashboardCountData.product
                        : 2332
                    }
                    duration={1}
                  />

                  <span className="text-white">৳</span>
                </h5>
              </div>
            </div>
            <div className=" state-main  mt-2 bg-white">
              <div className="state-img-box">
                <img src={salesIcon} width={26} height={24} alt="" />
              </div>
              <div className="mx-4 mb-2">
                <p>Total Sales</p>
                <h5 className="state-head">
                  ৳
                  <CountUp
                    end={
                      dashboardCountData.sales !== undefined
                        ? dashboardCountData.sales
                        : 127 * dashboardCountData.product
                    }
                    duration={0.2}
                  />
                </h5>
              </div>
            </div>
            <div className=" state-main  mt-2 bg-white">
              <div className="state-img-box">
                <img src={invoiceIcon} width={26} height={24} alt="" />
              </div>
              <div className="mx-4 mb-2">
                <p>Total Invoice</p>
                <h5 className="state-head">
                  <CountUp
                    end={
                      dashboardCountData.invoice !== undefined
                        ? dashboardCountData.invoice
                        : 212
                    }
                    duration={1}
                  />

                  <span className="text-white">৳</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* ==============React Chart ============== */} <AreaChart />{" "}
        {/* ==============React Chart ============== */}
        {/* imvoice Table */}
        {has_permissions(can_view_invoice) && (
          <div className="invoice-main ">
            <div className="head-select">
              <div>
                <h5>All Invoice</h5>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Search here"
                  onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
                />
              </div>

              <div
                className="drop-p d-none"
                ref={lastSelect}
                onClick={handleSelect}
              >
                <div className="select d-flex align-items-center gap-1">
                  <img className="me-1" src={blueTime} alt="" />
                  <span className="me-1">{selectVal}</span>
                  <img
                    className={`${dataDrop ? "blue-arrow" : "blue-arrow1"}`}
                    src={blueArrow}
                    alt=""
                  />
                </div>
                {dataDrop && (
                  <div className="py-2 px-3 bg-white drop">
                    <p className="mx-1" onClick={() => setSelectVal(select[0])}>
                      {select[0]}
                    </p>
                    <p className="mx-1" onClick={() => setSelectVal(select[1])}>
                      {select[1]}
                    </p>
                    <p className="mx-1" onClick={() => setSelectVal(select[2])}>
                      {select[2]}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* ===================table ========================*/}

            <div className="mt-4">
              <div className="" style={{ display: "block", overflowX: "auto" }}>
                <table className=" w-100">
                  <thead
                    className="bg-dark text-white head-row"
                    style={{
                      height: "50px",
                    }}
                  >
                    <tr className="">
                      {/* <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      minWidth: "90px",
                      textAlign: "center",
                      borderTopLeftRadius: "4px ",
                    }}
                  >
                    S/N
                  </th> */}
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          minWidth: "120px",
                        }}
                      >
                        <p className="ms-3 my-auto">Invoice No</p>
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          minWidth: "160px",
                        }}
                      >
                        Prepared By
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          minWidth: "130px",
                        }}
                      >
                        Delivery Status
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          width: "120px",
                        }}
                      >
                        Delivery Type
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          width: "150px",
                        }}
                      >
                        Payment Type
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          minWidth: "100px",
                        }}
                      >
                        Total
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          minWidth: "120px",
                        }}
                      >
                        Create On
                      </th>
                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          minWidth: "80px",
                        }}
                      >
                        Status
                      </th>

                      <th
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          borderTopRightRadius: "4px ",
                          minWidth: "120px",
                        }}
                      >
                        <span className="ms-4">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tb">
                    {getData.length > 0 && getData !== undefined ? (
                      getData
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((category, index) => (
                          <tr className="table-row " key={category?.slug}>
                            {/* <td className="text-center">{category?.slug}</td> */}
                            <td>
                              <p className="ms-3 my-auto">{category.number}</p>
                            </td>
                            <td>{category.prepared_by}</td>
                            <td>
                              <button
                                className={`status1 ${
                                  (category.delivery_status === 0 &&
                                    "bg-danger text-white") ||
                                  (category.delivery_status === 1 &&
                                    "c5 text-white") ||
                                  (category.delivery_status === 2 &&
                                    "bg-success text-white ")
                                }`}
                              >
                                {/* {category.delivery_status === 1 ? "Delivered" : "Processing"} */}
                                {deliveryStatus[category.delivery_status]}
                              </button>
                            </td>
                            <td>
                              <button
                                className={`status1 ${
                                  (category.delivery_type === 0 &&
                                    "c5 text-white") ||
                                  (category.delivery_type === 1 &&
                                    "bg-danger text-white")
                                }`}
                              >
                                {/* {category.delivery_status === 1 ? "Delivered" : "Processing"} */}
                                {delivery_type_choices[category.delivery_type]}
                              </button>
                            </td>
                            <td> {paymentType[category?.payment_type]}</td>
                            <td>৳ {category.total_amount}</td>
                            <td>{category.invoice_date}</td>
                            <td className="">
                              <button
                                className={`status1 ${
                                  (category.payment_status === 0 && "i1") ||
                                  (category.payment_status === 1 &&
                                    "c4 text-white") ||
                                  (category.payment_status === 2 &&
                                    "c3 text-white")
                                }`}
                              >
                                {invoice_choices[category.payment_status]}
                              </button>
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <div
                                  className="edit-del blue"
                                  onClick={() =>
                                    history.push(
                                      `/sales/view-invoice/${category?.slug}`
                                    )
                                  }
                                >
                                  <ViewIcon />
                                </div>
                                {has_permissions(can_change_invoice) ? (
                                  <div
                                    className="edit-del green"
                                    onClick={() =>
                                      history.push(
                                        `/sales/edit-invoice/${category?.slug}`
                                      )
                                    }
                                  >
                                    <EditIcon />
                                  </div>
                                ) : (
                                  <div
                                    className="edit-del green"
                                    onClick={() =>
                                      swal(
                                        "Sorry , You are not able to edit invoice."
                                      )
                                    }
                                  >
                                    <EditIcon />
                                  </div>
                                )}
                                {has_permissions(can_delete_invoice) ? (
                                  <div
                                    className="edit-del red"
                                    onClick={() => deleteData(category?.slug)}
                                  >
                                    <DeleteIcon />
                                  </div>
                                ) : (
                                  <div
                                    className="edit-del red"
                                    onClick={() =>
                                      swal(
                                        "Sorry , You are not able to delete invoice."
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
            {/* ===================table ========================*/}
            {getData.length > 0 && (
              <div className="row pag" style={{ marginTop: "30px" }}>
                <div className="col-6 col-md-5">
                  <p
                    className="inter"
                    style={{ color: "#AEAEB2", fontSize: "16px" }}
                  >
                    Total Entries:{" "}
                    <span style={{ color: "black", fontSize: "14px" }}>
                      {invoiceList.length}
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;

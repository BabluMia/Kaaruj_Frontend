import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BASE_URL } from "../Const/Url";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import EditIcon from "../CustomCommons/EditIcon";
import Loader from "../CustomCommons/Loader";
import ViewIcon from "../CustomCommons/ViewIcon";
import cover from "../user/img/cover.png";
import profile from "../user/img/profile.png";
import customerDefault from "./customerDefault.jpg";
import * as path from "../Routes/RoutePaths";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import PreviousIcon from "../CustomCommons/PreviousIcon";
import NextIcon from "../CustomCommons/NextIcon";
import {
  can_change_invoice,
  can_delete_invoice,
  has_permissions,
} from "../CustomCommons/utils";
import { deliveryStatus } from "../Const/Status";

const UserInfo = ({ label, info, button }) => {
  return (
    <>
      <div className="row mb-4 user_view_info_P p-0">
        <div className="col-3 p-0">{label}</div>

        {button ? (
          <button className="user_view_button">{button}</button>
        ) : (
          <div className="col-9 p-0">{info}</div>
        )}
      </div>
    </>
  );
};

const CustomerView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [singleCustomer, setSingleCustomer] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [invoiceList, setInvoiceList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;

  const getCustomerList = () => {
    const url = `${BASE_URL}api/v1/inventory/customer/${id}`;
    axios
      .get(url)
      .then((res) => {
        setSingleCustomer(res.data.data);
        // console.log(res.data.data);
        setIsloading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  //   get all invoice
  const getInvoiceList = () => {
    const url = `${BASE_URL}api/v1/sales/invoice/`;
    axios
      .get(url)
      .then((res) => {
        setInvoiceList(res.data.data.results);
        // console.log(res.data);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  const getData = invoiceList.filter(
    (invoice) => invoice?.to_mobile === singleCustomer?.mobile
  );
  const pageCount = Math.ceil(getData.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const delivery_type_choices = ["Regular", "Urgent"];
  const paymentType = ["Cash On delivery", "Card", "Bank Transfer", "bKash"];

  console.log(getData, "-----------------get data-----------------");
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

  useEffect(() => {
    getCustomerList();
    getInvoiceList();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  var options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const invoice_choices = ["Paid", "Unpaid", "Due"];

  const delivery_choices = ["Processing", "Recieved", "Delivered"];
  return (
    <div className="side_components_container">
      <div className="row ">
        {/* first part */}
        <div className="col-lg-5 col-sm-12 col-xs-12 ">
          <div className="user_view_image p-0">
            <div className="card ">
              <img className="card-img-top" src={cover} alt="" />

              <div className="user_name_info d-flex justify-content-center flex-column">
                <img
                  className="user_name_info_img "
                  style={{ borderRadius: "50%" }}
                  src={customerDefault}
                  alt=""
                />
                <h5 className="user_name_info_name">{singleCustomer?.name}</h5>
                <Link className="user_name_info_role">{` ${
                  singleCustomer?.status ? "Active" : "Disable"
                }`}</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7 col-sm-12 col-xs-12  user_view_contents user_view_contents2 p-0">
          <div className=" ">
            <h5 className="user_view_head ">Personal Details</h5>
            <div className="line_user_view mb-4 mt-3"></div>
            <UserInfo
              label="Email Address"
              info={`: ${
                singleCustomer?.email ? singleCustomer?.email : "N/A"
              }`}
            />
            <UserInfo
              label="Phone Number"
              info={`: ${singleCustomer?.mobile}`}
            />
            {/* <UserInfo label="Date of Birth" info=": 26 September, 1994" /> */}
            <UserInfo label="Gender" info=": Male" />

            <UserInfo
              label="Address"
              info={`: ${
                singleCustomer?.address
                  ? singleCustomer?.address
                  : "104 No. West Jurairn, Faridabad, Shayampur, Dhaka-1204"
              }`}
              //   info=": 104 No. West Jurairn, Faridabad, Shayampur, Dhaka-1204"
            />
            {/* <UserInfo label="Account Status" button={`${user?.status ? 'Active' :'Disable'}`} /> */}
            <div className="row mb-4 user_view_info_P p-0">
              <div className="col-3 p-0">Account Status</div>:{" "}
              <button
                className="user_view_button ms-1"
                style={{
                  background: `${
                    singleCustomer?.status === true ? "#749F82" : "#DE4839"
                  }`,
                }}
              >
                {" "}
                {` ${singleCustomer?.status === true ? "Active" : "Disable"}`}
              </button>{" "}
            </div>

            <UserInfo
              label="Joining Date"
              info={`: ${new Date(
                singleCustomer?.created_at
              ).toLocaleDateString("en-US", options)}`}
            />
          </div>
        </div>
      </div>
      <div className="row my-4">
        {/* categorey list table */}
        <div className="col-12 mb-4">
          <div style={{ display: "block", overflowX: "auto" }}>
            <table className="table_my">
              <thead
                className="bg-dark text-white head-row"
                style={{
                  height: "50px",
                  borderTopLeftRadius: "20px !important",
                }}
              >
                <tr className="">
                  {/* <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "99px",
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
                      width: "140px",
                    }}
                  >
                    <p className="ms-3 my-auto">Invoice No</p>
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      width: "150px",
                    }}
                  >
                    Prepared By
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      width: "147px",
                    }}
                  >
                    Delivery Status
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      width: "130px",
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
                      width: "140px",
                    }}
                  >
                    Total
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      width: "150px",
                    }}
                  >
                    Create On
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      width: "110px",
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      borderTopRightRadius: "4px ",
                      width: "150px",
                    }}
                  >
                    <span className="ms-4">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="tb">
                {getData.length > 0 ? (
                  getData.map((category, index) => (
                    <tr className="table-row " key={category?.slug}>
                      <td>
                        <p className="ms-3 my-auto">{category.number}</p>
                      </td>
                      <td>{category?.prepared_by}</td>
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
                      {/* <td>৳ {category?.total_with_discount}</td> */}
                      <td>
                        <button
                          className={`status1 ${
                            (category.delivery_type === 0 && "c5 text-white") ||
                            (category.delivery_type === 1 &&
                              "bg-danger text-white")
                          }`}
                        >
                          {/* {category.delivery_status === 1 ? "Delivered" : "Processing"} */}
                          {delivery_type_choices[category.delivery_type]}
                        </button>
                      </td>
                      <td> {paymentType[category?.payment_type]}</td>
                      <td>৳ {category?.total_amount}</td>
                      <td>{category?.invoice_date}</td>
                      <td className="">
                        <button
                          className={`status1 ${
                            (category.payment_status === 0 && "i1") ||
                            (category.payment_status === 1 &&
                              "c4 text-white") ||
                            (category.payment_status === 2 && "c3 text-white")
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
                              history.push(`/sales/view-invoice/${category?.slug}`)
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
                        <h4 className="my-4">No Invoice Found</h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {getData?.length > 0 && (
          <div className="row pag" style={{ marginTop: "30px" }}>
            <div className="col-6 col-md-5">
              <p
                className="inter"
                style={{ color: "#AEAEB2", fontSize: "16px" }}
              >
                Total Entries:{" "}
                <span style={{ color: "black", fontSize: "14px" }}>
                  {getData?.length}
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

export default CustomerView;

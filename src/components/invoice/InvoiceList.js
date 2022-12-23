import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import plus from "../../assets/Icon/plus.svg";
import { BASE_URL } from "../Const/Url";
import UseData from "../Const/UseData";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import EditIcon from "../CustomCommons/EditIcon";
import Loader from "../CustomCommons/Loader";
import NextIcon from "../CustomCommons/NextIcon";
import Paggination from "../CustomCommons/Paggination";
import Permission from "../CustomCommons/Permission";
import PreviousIcon from "../CustomCommons/PreviousIcon";
import {
  can_add_invoice,
  can_change_invoice,
  can_delete_invoice,
  can_view_invoice,
  has_permissions,
} from "../CustomCommons/utils";
import ViewIcon from "../CustomCommons/ViewIcon";
import * as path from "../Routes/RoutePaths";

const InvoiceList = () => {
  const [isLoading, SetisLoading] = useState(true);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;
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
  const [poduct, setProduct] = useState(categoreyData);
  const [invoiceList, setInvoiceList] = useState([]);
  const total = 210.44;
  const invoice_choices = ["Paid", "Unpaid", "Due"];

  const delivery_choices = ["Returned", "Recieved", "Delivered"];
  const delivery_type_choices = ["Regular", "Urgent"];
  const paymentType = ["C.O.D", "Card", "Bank Transfer", "bKash"];
  var options = {
    day: "numeric",
    year: "numeric",
    month: "numeric",

    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
  };

  const getInvoiceList = () => {
    const url = `${BASE_URL}api/v1/sales/invoice/`;
    axios
      .get(url)
      .then((res) => {
        setInvoiceList(res.data.data.results);
        // console.log('--------------converted Data--------------')
        // console.log(res.data?.data?.results?.map((curr) => ({
        //   ...curr,
        //   created_at: curr.created_at.split('T')[0],
        // })))
        // console.log('--------------converted Data--------------')

        // console.log(res.data);
        SetisLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getInvoiceList();
  }, []);
  // console.log(data);

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
  const keys = ["number", "prepared_by", "delivery_status", "invoice_date"];
  const getData = invoiceList.filter((p) =>
    keys.some((key) => p[key]?.toString()?.toLowerCase()?.includes(query))
  );
  const pageCount = Math.ceil(getData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // console.log(invoiceList);
  if (!has_permissions(can_view_invoice)) {
    return <Permission />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="categorey-parent">
        <div className="cotagorey-head mb-4">
          <div>
            <h3>Invoice List </h3>
            <input
              type="text"
              className="filter-input"
              placeholder="Search here"
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            />
          </div>
          {has_permissions(can_add_invoice) && (
            <div
              className="button-div"
              onClick={() => history.push(path.create_invoice)}
            >
              <img src={plus} alt="" />
              <span> Create Invoice</span>
            </div>
          )}
        </div>
        {/* categorey list table */}
        <div style={{ display: "block", overflowX: "auto" }}>
          <table className="table_my">
            <thead
              className="bg-dark text-white head-row"
              style={{ height: "50px", borderTopLeftRadius: "20px !important" }}
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
                    width: "166px",
                  }}
                >
                  <p className="ms-3 my-auto">Invoice No</p>
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "187px",
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
                    width: "170px",
                  }}
                >
                  Payment Type
                </th>

                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "120px",
                  }}
                >
                  Total
                </th>
                {/* <th 
                 style={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  width: "100px",
                }}>
                  Count
                </th> */}
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "130px",
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
                getData
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((category, index) => (
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
                          {delivery_choices[category.delivery_status]}
                        </button>
                      </td>

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
                      {/* <td>
                      <span className="ms-1">
                      0
                      </span>
                    </td> */}
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
                      <h4 className="my-4">No Data Found</h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* entites and paggination */}
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
    </div>
  );
};

export default InvoiceList;

import React from "react";
import plus from "../../assets/Icon/plus.svg";
import "./Customar.css";
import Select from "react-select";
import thumb1 from "../../assets/Icon/thumb1.svg";
import thumb2 from "../../assets/Icon/thumb2.svg";
import thumb3 from "../../assets/Icon/thumb3.svg";
import thumb4 from "../../assets/Icon/thumb4.svg";
import thumb5 from "../../assets/Icon/thumb5.svg";
import thumb6 from "../../assets/Icon/thumb6.svg";
import thumb7 from "../../assets/Icon/thumb7.svg";
import Paggination from "../CustomCommons/Paggination";
import ViewIcon from "../CustomCommons/ViewIcon";
import EditIcon from "../CustomCommons/EditIcon";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { BASE_URL } from "../Const/Url";
import { useEffect } from "react";
import { showToast } from "../../utils/ToastHelper";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import UseData from "../Const/UseData";
import Loader from "../CustomCommons/Loader";
import PreviousIcon from "../CustomCommons/PreviousIcon";
import NextIcon from "../CustomCommons/NextIcon";
import * as path from "../Routes/RoutePaths";
import {
  can_add_customer,
  can_change_customer,
  can_delete_customer,
  can_view_customer,
  has_permissions,
} from "../CustomCommons/utils";
import Permission from "../CustomCommons/Permission";

const CustomerList = () => {
  const history = useHistory();
  // const [data,loader]= UseData(`${BASE_URL}api/v1/inventory/customer/`)
  const [loader, setLoader] = useState(true);
  const [query, setQuery] = useState("");
  const [renking, setRenking] = useState("all");
  const options = [
    { value: "all", label: "See All" },
    { value: "today", label: "Daily" },
    { value: "week", label: "Weekly" },
    { value: "month", label: "Monthly" },
  ];
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;

  const categoreyData = [
    {
      id: 1,
      img: thumb1,
      parentCategorey: "Food",
      categorey: "Lounge Pillow ",
      lastModi: "Jan 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Jone Dames",
      total: "৳219.00",
      stock: "08",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
    {
      id: 2,
      img: thumb2,
      parentCategorey: "Mashed Potatoes",
      categorey: "Cushion Cover",
      lastModi: "Feb 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Sajid Hossain",
      total: "৳379.00",
      stock: "09",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
    {
      id: 3,
      img: thumb3,
      parentCategorey: "Rice",
      categorey: "Trivet Set",
      lastModi: "March 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Jillur Ahmed",
      total: "৳579.00",
      stock: "11",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
    {
      id: 4,
      img: thumb4,
      parentCategorey: "Protein Bar",
      categorey: "Napkin",
      lastModi: "Jun 11, 2021 at 01:49 pm",
      status: "Disable",
      btnColour: "red",
      name: "William Hons",
      total: "৳544.00",
      stock: "14",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
    {
      id: 5,
      img: thumb5,
      parentCategorey: "Roast Chicken",
      categorey: "Table Cloth",
      lastModi: "Nov 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Zack Pillas",
      total: "৳562.00",
      stock: "07",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
    {
      id: 6,
      img: thumb6,
      parentCategorey: "Rice",
      categorey: "Table Runner",
      lastModi: "Jan 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Mary James",
      total: "৳873.00",
      stock: "10",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
    {
      id: 7,
      img: thumb7,
      parentCategorey: "Protein Bar",
      categorey: "Table Lamp",
      lastModi: "Jan 11, 2021 at 01:49 pm",
      status: "Disable",
      btnColour: "red",
      name: "Proshanto Ghosh",
      total: "৳379.00",
      stock: "07",
      phone: "+8801812345678",
      email: "stak89@gmail.com",
    },
  ];

  const [poduct, setProduct] = useState(categoreyData);
  // api
  const [customarList, setCustomarList] = useState([]);
  // ---------------------------
  const getCustomerList = () => {
    const url = `${BASE_URL}api/v1/inventory/customer/ranking/?filter=${renking}`;
    axios
      .get(url)
      .then((res) => {
        if (renking === "all") {
          setCustomarList(res.data.data.data);
        } else {
          setCustomarList(
            res?.data?.data?.data?.sort(
              (a, b) =>
                parseInt(b?.total_purchase) - parseInt(a?.total_purchase)
            )
          );
        }
        // console.log(res.data);
        setLoader(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  // useEffect(()=>{
  //   const url = `${BASE_URL}api/v1/inventory/customer/ranking/?filter=${renking}`;
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       // setCustomarList(res.data.data.results);
  //       console.log('--------------------------=====')
  //       console.log(res.data.data.data);
  //       console.log('--------------------------=====')
  //       // setLoader(false)
  //     })
  //     .catch((err) => {
  //       const message = JSON.parse(err.request.response).message;
  //       console.log(err.request.response);
  //     });
  // },[renking])
  const keys = ["name", "mobile", "email", "address", "count"];
  // total_purchase

  const getData = customarList
    // ?.sort((a, b) => parseInt(b?.total_purchase) - parseInt(a?.total_purchase))
    .filter((p) =>
      keys.some((key) => p[key]?.toString()?.toLowerCase()?.includes(query))
    );

  // else{
  //   const getData = customarList
  //   ?.sort((a, b) => parseInt(b?.total_purchase) - parseInt(a?.total_purchase))
  //   .filter((p) =>
  //     keys.some((key) => p[key]?.toString()?.toLowerCase()?.includes(query))
  //   );
  // }

  const pageCount = Math.ceil(getData?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    getCustomerList();
  }, [renking]);
  // console.log(customarList,'---------------');

  const deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/inventory/customer/${id}`;
        axios
          .delete(url)
          .then(() => {
            showToast("Delele", "Data Deleted");
            getCustomerList();
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
  const handleRank = (newVal, action) => {
    // console.log(newVal.value,'----------------------newVal------------')
    setRenking(newVal.value);
  };
  if (!has_permissions(can_view_customer)) {
    return <Permission />;
  }
  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <div className="categorey-parent ">
        <div className="cotagorey-head customar-head mb-4">
          <div>
            <h3>Customer List </h3>
            <input
              type="text"
              className="filter-input"
              placeholder="Search here"
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="me-2 mb-3 mb-md-0">
              <p className="rank">Filter Rank :</p>
              <div
                className="sl"
                style={{ width: "150px", marginTop: "-15px" }}
              >
                <Select
                  onChange={handleRank}
                  defaultValue={options.slice(0, 1)}
                  options={options}
                  placeholder="---Select---"
                />
              </div>
            </div>
            {has_permissions(can_add_customer) && (
              <div className="button-div mt-4 " onClick={()=>history.push(path.add_customer)}>
                <img src={plus} alt="" />
                <span>Add Customer</span>
              </div>
            )}
          </div>
        </div>

        {/* customer list table */}
        <div style={{ display: "block", overflowX: "auto" }}>
          <table className="table_my">
            <thead
              className="bg-dark text-white head-row"
              style={{ height: "50px" }}
            >
              <tr className="">
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "99px",
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
                    width: "170px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "197px",
                  }}
                >
                  Mobile No
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "210px",
                  }}
                >
                  Customer Address
                </th>

                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "140px",
                  }}
                >
                  Total Purchese
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "150px",
                  }}
                >
                  Invoice Count
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "120px",
                  }}
                >
                  Status
                </th>

                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    borderTopRightRadius: "4px ",
                    width: "140px",
                  }}
                >
                  <p className="ms-4 my-auto">Action</p>
                </th>
              </tr>
            </thead>
            <tbody className="tb">
              {getData?.length > 0 ? (
                getData
                  ?.slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((category) => (
                    <tr className="table-row " key={category.id}>
                      <td className="text-center">{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.mobile}</td>
                      <td>
                        {category?.address
                          ? category?.address.length > 15
                            ? `${category.address.slice(0, 20)}...`
                            : category.address
                          : "N/A"}
                      </td>
                      <td>৳ {category.total_purchase}</td>
                      <td>
                        <span className="ms-2">
                          {category?.count ? category.count : 0}
                        </span>
                      </td>

                      <td className="">
                        <button
                          className={`status ${
                            category.status === true ? "c1" : "c2"
                          }`}
                          style={{ color: `${category.btnColour}` }}
                        >
                          {category.status === true ? "Active" : "Disable"}
                        </button>
                      </td>
                      <td>
                        {/* slug */}
                        <div className="d-flex gap-3">
                          <div
                            className="edit-del blue"
                            onClick={() =>
                              history.push(
                                `/customer/customer-view/${category.slug}`
                              )
                            }
                          >
                            <ViewIcon />
                          </div>
                          {has_permissions(can_change_customer) ? (
                            <div
                              className="edit-del green"
                              onClick={() =>
                                history.push(
                                  `/customer/edit-customer/${category.slug}`
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
                                  "Sorry , You have not permission to change customer."
                                )
                              }
                            >
                              <EditIcon />
                            </div>
                          )}

                          {has_permissions(can_delete_customer) ? (
                            <div
                              className="edit-del red"
                              onClick={() => deleteData(category.slug)}
                            >
                              <DeleteIcon />
                            </div>
                          ) : (
                            <div
                              className="edit-del red"
                              onClick={() =>
                                swal(
                                  "Sorry , You have not permission to delete customer."
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
        {getData?.length > 0 && (
          <div className="row pag" style={{ marginTop: "30px" }}>
            <div className="col-6 col-md-5">
              <p
                className="inter"
                style={{ color: "#AEAEB2", fontSize: "16px" }}
              >
                Total Entries:{" "}
                <span style={{ color: "black", fontSize: "14px" }}>
                  {customarList?.length}
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

export default CustomerList;

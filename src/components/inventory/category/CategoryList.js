import React, { useState } from "react";
import "./css/category.css";
import plus from "../../../assets/Icon/plus.svg";
import thumb1 from "../../../assets/Icon/thumb1.svg";
import thumb2 from "../../../assets/Icon/thumb2.svg";
import thumb3 from "../../../assets/Icon/thumb3.svg";
import thumb4 from "../../../assets/Icon/thumb4.svg";
import thumb5 from "../../../assets/Icon/thumb5.svg";
import thumb6 from "../../../assets/Icon/thumb6.svg";
import thumb7 from "../../../assets/Icon/thumb7.svg";
import delet from "../../../assets/Icon/delete.svg";
import edit from "../../../assets/Icon/edit.svg";
import next from "../../../assets/Icon/next.svg";
import pre from "../../../assets/Icon/pre.svg";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import Paggination from "../../CustomCommons/Paggination";
import EditIcon from "../../CustomCommons/EditIcon";
import DeleteIcon from "../../CustomCommons/DeleteIcon";
import swal from "sweetalert";
import * as path from "../../Routes/RoutePaths";
import getFilterData from "../../CustomCommons/Filter";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Const/Url";
import { showToast } from "../../../utils/ToastHelper";
import CustpmPaggination from "../../CustomCommons/CustpmPaggination";
import ReactPaginate from "react-paginate";
import UseData from "../../Const/UseData";
import Loader from "../../CustomCommons/Loader";
import PreviousIcon from "../../CustomCommons/PreviousIcon";
import NextIcon from "../../CustomCommons/NextIcon";
import {
  can_add_category,
  can_change_category,
  can_delete_category,
  can_view_category,
  has_permissions,
} from "../../CustomCommons/utils";
import Permission from "../../CustomCommons/Permission";

// import 'sweetalert2/src/sweetalert2.scss'

const CategoryList = () => {
  // const [data,loader]= UseData(`${BASE_URL}api/v1/inventory/category/`)
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const [categoryList, setcategoryList] = useState([]);
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
      name: "Contemporary Cu....",
    },
    {
      id: 2,
      img: thumb2,
      parentCategorey: "Mashed Potatoes",
      categorey: "Cushion Cover",
      lastModi: "Feb 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Jamdani Printed....",
    },
    {
      id: 3,
      img: thumb3,
      parentCategorey: "Rice",
      categorey: "Trivet Set",
      lastModi: "March 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Trivet Set",
    },
    {
      id: 4,
      img: thumb4,
      parentCategorey: "Protein Bar",
      categorey: "Napkin",
      lastModi: "Jun 11, 2021 at 01:49 pm",
      status: "Disable",
      btnColour: "red",
      name: "Hand Stitched....",
    },
    {
      id: 5,
      img: thumb5,
      parentCategorey: "Roast Chicken",
      categorey: "Table Cloth",
      lastModi: "Nov 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "Handloomed Table....",
    },
    {
      id: 6,
      img: thumb6,
      parentCategorey: "Rice",
      categorey: "Table Runner",
      lastModi: "Jan 11, 2021 at 01:49 pm",
      status: "Active",
      btnColour: "#219653",
      name: "IKAT Handloom....",
    },
    {
      id: 7,
      img: thumb7,
      parentCategorey: "Protein Bar",
      categorey: "Table Lamp",
      lastModi: "Jan 11, 2021 at 01:49 pm",
      status: "Disable",
      btnColour: "red",
      name: "Hand Stitched Tab....",
    },
  ];
  const [product, setProduct] = useState(categoreyData);

  const keys = ["name", "updated_at",'tree','products'];
  const getData = categoryList.filter((p) =>
    keys.some((key) => p[key]?.toString().toLowerCase()?.includes(query))
  );
  const pageCount = Math.ceil(getData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getCategory = () => {
    const url = `${BASE_URL}api/v1/inventory/category/`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data.results);
        const result = res.data.data.results;
        setcategoryList(result);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getCategory();
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
        const url = `${BASE_URL}api/v1/inventory/category/${id}/`;

        // const filterd = product.filter((i) => i.id !== id);
        // setProduct(filterd);
        axios
          .delete(url)
          .then(() => {
            showToast("Delele", "Data Deleted");
            getCategory();
          })
          .catch((err) => {
            const message = JSON.parse(err.request.response).message;
            console.log(message);
          });
        swal(" Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  var options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  if (!has_permissions(can_view_category)) {
    return <Permission />;
  }
  if (isLoading) {
    return <Loader />;
  }

  // console.log(categoryList);

  return (
    <div>
      <div className="categorey-parent">
        <div className="cotagorey-head mb-4">
          <div>
            <h3>Category List </h3>
            <input
              type="text"
              className="filter-input"
              placeholder="Search here"
              onChange={(e) =>
                setQuery(e.target.value.toLocaleLowerCase().toString())
              }
            />
          </div>
          {has_permissions(can_add_category) && (
            <div
              className="button-div"
              onClick={() => history.push(path.add_category)}
            >
              <img src={plus} alt="" />
              <span>Add Category</span>
            </div>
          )}
        </div>
        {/* categorey list table */}
        <div className="table-responsive">
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
                    width: "110px",
                    minWidth: "110px",
                  }}
                >
                  Thumbnail
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "180px",
                    minWidth: "180px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "220px",
                    minWidth: "220px",
                  }}
                >
                  Parent Category
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "100px",
                    minWidth: "100px",
                  }}
                >
                  Products
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "270px",
                    minWidth: "270px",
                  }}
                >
                  Last Modified
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "141px",
                    minWidth: "141px",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    borderTopRightRadius: "4px ",
                    width: "141px",
                    minWidth: "141px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="tb">
              {getData.length > 0 ? (
                getData
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((category, index) => (
                    <tr className="table-row " key={category?.slug}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <img
                          width={50}
                          style={{ margin: "6px 0px !important" }}
                          height={50}
                          src={category.thumb !== "" ? category.thumb : thumb1}
                          alt=""
                        />
                      </td>
                      <td>{category.name}</td>
                      <td>
                        {category?.tree ===  '' || null ? "N/A" : category?.tree}
                      </td>
                      <td>{
                        category?.products ? category?.products : '0'}</td>
                      <td>
                        {new Date(category.updated_at).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td className="">
                        <button
                          className={`status ${
                            category.is_active === true ? "c1" : "c2"
                          }`}
                        >
                          {category.is_active === true ? "Active" : "Disable"}
                        </button>
                      </td>
                      <td>
                        <div className="d-flex gap-3">
                          {has_permissions(can_change_category) ? (
                            <div
                              className="edit-del green"
                              onClick={() =>
                                history.push(
                                  `/inventory/edit-category/${category?.slug}`
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
                                  "Sorry,You have not able to  edit category."
                                )
                              }
                            >
                              <EditIcon />
                            </div>
                          )}

                          {has_permissions(can_delete_category) ? (
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
                                  "Sorry,You have not able to delete category."
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
                  {categoryList.length}
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

        {/* <CustpmPaggination allData={getData} /> */}
      </div>
    </div>
  );
};

export default CategoryList;

import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import DeleteIcon from "../../CustomCommons/DeleteIcon";
import EditIcon from "../../CustomCommons/EditIcon";
import Paggination from "../../CustomCommons/Paggination";
import ViewIcon from "../../CustomCommons/ViewIcon";
import Select from "react-select";
// import plus from "../../../assets/";
import plus from "./../../../assets/Icon/plus.svg";
import thumb1 from "./../../../assets/Icon/thumb1.svg";
import thumb2 from "./../../../assets/Icon/thumb2.svg";
import thumb3 from "./../../../assets/Icon/thumb3.svg";
import thumb4 from "./../../../assets/Icon/thumb4.svg";
import thumb5 from "./../../../assets/Icon/thumb5.svg";
import thumb6 from "./../../../assets/Icon/thumb6.svg";
import thumb7 from "./../../../assets/Icon/thumb7.svg";
// import delet from "./../../../assets/Icon/edit.svg";
// import view from "./../../../assets/Icon/view.svg";
// import edit from "./../../../assets/Icon/delete.svg";
// import Table from "react-bootstrap/Table";
import * as path from "../../Routes/RoutePaths";
import { useEffect } from "react";
import { BASE_URL } from "../../Const/Url";
import axios from "axios";
import ReactPaginate from "react-paginate";
import UseData from "../../Const/UseData";
import Loader from "../../CustomCommons/Loader";
import PreviousIcon from "../../CustomCommons/PreviousIcon";
import NextIcon from "../../CustomCommons/NextIcon";
import kaarujLogo from "../../../assets/Icon/KAARUJ 1.png";
import {
  can_add_products,
  can_change_products,
  can_delete_products,
  can_view_products,
  has_permissions,
} from "../../CustomCommons/utils";
import Permission from "../../CustomCommons/Permission";
import { useReactToPrint } from "react-to-print";

const ProductList = () => {
  const [isLoading, SetisLoading] = useState(true);
  const [renking, setRenking] = useState("all");
  const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  const options2 = [
    { value: "all", label: "See All" },
    { value: "today", label: "Daily" },
    { value: "week", label: "Weekly" },
    { value: "month", label: "Monthly" },
    { value: "year", label: "Yearly" },
  ];

  // const [data,loader] = UseData(`${BASE_URL}api/v1/inventory/products/`)
  const cRef = useRef();
  const [query, setQuery] = useState("");
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;
  console.log(pageNumber + 1, "-----------------page Number-------");
  const categoreyData = [
    {
      id: 1,
      img: thumb1,
      parentCategorey: "Food",
      categorey: "Lounge Pillow ",
      lastModi: "22/03/2022",
      status: "Active",
      btnColour: "#219653",
      name: "Contemporary Cu....",
      total: 12,
      stock: "08",
      tSale: "14",
    },
    {
      id: 2,
      img: thumb2,
      parentCategorey: "Mashed Potatoes",
      categorey: "Cushion Cover",
      lastModi: "22/06/2022",
      status: "Active",
      btnColour: "#219653",
      name: "Jamdani Printed....",
      total: 15,
      stock: "09",
      tSale: "17",
    },
    {
      id: 3,
      img: thumb3,
      parentCategorey: "Rice",
      categorey: "Trivet Set",
      lastModi: "27/07/2022",
      status: "Active",
      btnColour: "#219653",
      name: "Trivet Set",
      total: 14,
      stock: "11",
      tSale: "12",
    },
    {
      id: 4,
      img: thumb4,
      parentCategorey: "Protein Bar",
      categorey: "Napkin",
      lastModi: "22/03/2022",
      status: "Disable",
      btnColour: "red",
      name: "Hand Stitched....",
      total: 17,
      stock: "14",
      tSale: "15",
    },
    {
      id: 5,
      img: thumb5,
      parentCategorey: "Roast Chicken",
      categorey: "Table Cloth",
      lastModi: "22/03/2022",
      status: "Active",
      btnColour: "#219653",
      name: "Handloomed Table....",
      total: 22,
      stock: "07",
      tSale: "20",
    },
    {
      id: 6,
      img: thumb6,
      parentCategorey: "Rice",
      categorey: "Table Runner",
      lastModi: "22/03/2022",
      status: "Active",
      btnColour: "#219653",
      name: "IKAT Handloom....",
      total: 12,
      stock: "10",
      tSale: "10",
    },
    {
      id: 7,
      img: thumb7,
      parentCategorey: "Protein Bar",
      categorey: "Table Lamp",
      lastModi: "22/03/2022",
      status: "Disable",
      btnColour: "red",
      name: "Hand Stitched Tab....",
      total: 12,
      stock: "07",
      tSale: "09",
    },
  ];
  const [poduct, setProduct] = useState(categoreyData);
  const [productList, setProductList] = useState([]);
  console.log(productList, "-----------Product List-----------");
  const getProduct = () => {
    const url = `${BASE_URL}/api/v1/inventory/products/ranking/?filter=${renking}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data.data);
        const result = res.data.data?.data;
        if (renking === "all") {
          setProductList(res.data.data?.data);
        } else {
          setProductList(
            res.data.data?.data?.sort((a, b) => b.total_sales - a.total_sales)
          );
        }
        SetisLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getProduct();
  }, [renking]);
  // console.log(productList,'--------------product---------');
  var options = {
    // weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // hour: 'numeric', minute: 'numeric', hour12: true
  };
  const deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${BASE_URL}api/v1/inventory/products/${id}`;
        axios
          .delete(url)
          .then(() => {
            // showToast("Delele", "Data Deleted");
            getProduct();
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
  const keys = [
    "name",
    "category",
    "updated_at",
    "total",
    "total_sales",
    "stock",
    "sku",
  ];
  const getData = productList?.filter((p) =>
    keys.some((key) => p[key]?.toString()?.toLowerCase()?.includes(query))
  );
  // .sort((a, b) => b.sales - a.sales);
  const pageCount = Math.ceil(getData?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const HandlePrint = useReactToPrint({
    content: () => cRef.current,
    documentTitle: "Product List",
    // onAfterPrint: () => swal("Printed"),
    bodyClass: "dis",
  });
  if (!has_permissions(can_view_products)) {
    return <Permission />;
  }
  if (isLoading) {
    return <Loader />;
  }
  const handleRank = (newVal, action) => {
    // console.log(newVal.value,'----------------------newVal------------')
    setRenking(newVal.value);
  };

  return (
    <div>
      <div className="categorey-parent">
        <div className="cotagorey-head mb-4">
          <div>
            <h3>Product List </h3>
            <input
              type="text"
              className="filter-input"
              placeholder="Search here"
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            />
          </div>
          <div className="d-flex">
            <div
              className="sl mt-1"
              style={{ width: "150px", marginRight: "5px" }}
            >
              <Select
                onChange={handleRank}
                defaultValue={options2.slice(0, 1)}
                options={options2}
                placeholder="---Select---"
              />
            </div>
            {has_permissions(can_add_products) && (
              <div
                className="button-div"
                onClick={() => history.push(path.add_product)}
              >
                <img src={plus} alt="" />
                <span>Add Product</span>
              </div>
            )}
            {productList?.length > 0 && (
              <div
                className="button-div my-auto ms-2  text-white rounded"
                style={{ background: "black", cursor: "pointer" }}
                onClick={() => HandlePrint()}
              >
                <span> Print</span>
              </div>
            )}
          </div>
        </div>
        {/* categorey list table */}
        <div style={{ display: "block", overflowX: "auto", }}>
          <table className="table_my pdf-table my-3" >
            {/* <thead
              className="d-none  thed w-100 text-center me-4"
              style={{ marginTop: "40px" }}
            >
              <div className="mb-4 pb-4 d-flex justify-content-center align-items-center">
                <img className="pb-3" src={kaarujLogo} width={150} alt="" />
                <p className="mt-2 ms-4">
                  Print Date : {currentDate}{" "}
                  <span className="ms-3">Page Number : {pageNumber + 1}</span>
                </p>
              </div>
            </thead> */}
            <thead
              className="bg-dark text-white head-row mt-3 main-head-print"
              style={{ height: "50px" }}
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
                    width: "120px",
                  }}
                >
                  <p className="ms-3 my-auto">Thumbnail</p>
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "200px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "150px",
                  }}
                >
                  SKU
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "170px",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "180px",
                  }}
                >
                  Last Modified
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "100px",
                  }}
                >
                  Total
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "100px",
                  }}
                >
                  Stock
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "140px",
                  }}
                >
                  Total Sale
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "141px",
                  }}
                >
                  Status
                </th>

                <th
                  className="action"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    borderTopRightRadius: "4px ",
                    width: "135px",
                    textAlign: "center",
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
                      {/* <td className="text-center">{category?.slug}</td> */}
                      <td>
                        <img
                          width={50}
                          style={{ margin: "6px 0px !important" }}
                          height={50}
                          src={`${BASE_URL}${category.thumb}`}
                          alt=""
                          className="ms-3"
                        />
                      </td>
                      <td>
                        {category.name.length > 15
                          ? `${category.name.slice(0, 15)}...`
                          : category.name.slice(0, 15)}
                      </td>
                      <td>{category?.sku ? category?.sku : "N/A"}</td>
                      <td>{category.category ? category?.category : "N/A"}</td>

                      <td>
                        {new Date(category.updated_at).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td>{category.total}</td>
                      <td>{category.stock}</td>
                      <td>{category.total_sales}</td>

                      <td>
                        <button
                          className={`status ${
                            category.is_active === true ? "c1" : "c2"
                          }`}
                          style={{ color: `${category.btnColour}` }}
                        >
                          {category.is_active === true ? "Active" : "Disable"}
                        </button>
                      </td>
                      <td className="action">
                        <div className="d-flex gap-3">
                          <div
                            className="edit-del blue"
                            onClick={() =>
                              history.push(
                                `/inventory/product-view/${category?.slug}`
                              )
                            }
                          >
                            <ViewIcon />
                          </div>
                          {has_permissions(can_change_products) ? (
                            <div
                              className="edit-del green"
                              onClick={() =>
                                history.push(
                                  `/inventory/edit-product/${category?.slug}`
                                )
                              }
                            >
                              <EditIcon />
                            </div>
                          ) : (
                            <div
                              className="edit-del green"
                              onClick={() =>
                                swal("Sorry, You are not able to edit product.")
                              }
                            >
                              <EditIcon />
                            </div>
                          )}

                          {has_permissions(can_delete_products) ? (
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
                                  "Sorry , You are not able to delete product"
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
        <div style={{ display: "none" }} className='pt-4' >
          <table style={{marginTop:'50px',marginRight:'600px'}} className="table_my pdf-table my-3 pt-4 print_table" ref={cRef} >
            <thead
              className="d-none  thed w-100 text-center me-4"
              style={{ marginTop: "40px" }}
            >
              <div className="mb-4 pb-4 d-flex justify-content-center align-items-center">
                <img className="pb-3" src={kaarujLogo} width={150} alt="" />
                <p className="mt-2 ms-4">
                  Print Date : {currentDate}{" "}
                  <span className="ms-3">Total Item : {productList.length}</span>
                </p>
              </div>
            </thead>
            <thead
              className="bg-dark text-white head-row mt-3 main-head-print"
              style={{ height: "50px" }}
            >
              <tr className="">
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "120px",
                  }}
                >
                  <p className="ms-3 my-auto">Thumbnail</p>
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "200px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "150px",
                  }}
                >
                  SKU
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "170px",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "180px",
                  }}
                >
                  Last Modified
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "100px",
                  }}
                >
                  Total
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "100px",
                  }}
                >
                  Stock
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "140px",
                  }}
                >
                  Total Sale
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    borderTopRightRadius: "4px ",
                    width: "141px",
                  }}
                >
                  Status
                </th>

               
              </tr>
            </thead>
            <tbody className="tb">
              {getData.length > 0 ? (
                productList.map((category, index) => (
                    <tr className="table-row " key={category?.slug}>
                      {/* <td className="text-center">{category?.slug}</td> */}
                      <td>
                        <img
                          width={50}
                          style={{ margin: "6px 0px !important" }}
                          height={50}
                          src={`${BASE_URL}${category.thumb}`}
                          alt=""
                          className="ms-3"
                        />
                      </td>
                      <td>
                        {category.name.length > 15
                          ? `${category.name.slice(0, 15)}...`
                          : category.name.slice(0, 15)}
                      </td>
                      <td>{category?.sku ? category?.sku : "N/A"}</td>
                      <td>{category.category ? category?.category : "N/A"}</td>

                      <td>
                        {new Date(category.updated_at).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td>{category.total}</td>
                      <td>{category.stock}</td>
                      <td>{category.total_sales}</td>

                      <td>
                        <button
                          className={`status ${
                            category.is_active === true ? "c1" : "c2"
                          }`}
                          style={{ color: `${category.btnColour}` }}
                        >
                          {category.is_active === true ? "Active" : "Disable"}
                        </button>
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
        {getData.length > 0 && (
          <div className="row pag" style={{ marginTop: "30px" }}>
            <div className="col-6 col-md-5">
              <p
                className="inter"
                style={{ color: "#AEAEB2", fontSize: "16px" }}
              >
                Total Entries:{" "}
                <span style={{ color: "black", fontSize: "14px" }}>
                  {productList.length}
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

export default ProductList;

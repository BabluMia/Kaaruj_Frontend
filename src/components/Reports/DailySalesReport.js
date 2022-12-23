import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../Const/Url";
import UseData from "../Const/UseData";
import DeleteIcon from "../CustomCommons/DeleteIcon";
import Loader from "../CustomCommons/Loader";
import ViewIcon from "../CustomCommons/ViewIcon";
import * as path from "../Routes/RoutePaths";
import * as moment from "moment";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import PreviousIcon from "../CustomCommons/PreviousIcon";
import NextIcon from "../CustomCommons/NextIcon";
import { can_delete_report, can_view_report, has_permissions } from "../CustomCommons/utils";
import Permission from "../CustomCommons/Permission";
import { useReactToPrint } from "react-to-print";

const DailySalesReport = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [query, setQuery] = useState("");
  const history = useHistory();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${month}-${day}-${year}`;
  const [mainReportLength, setMainReportLength] = useState(0);
  const salesReport = [
    {
      id: 1,
      date: "09/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 2,
      date: "12/09/2022",
      totalAmount: "৳8328.85",
      totalVat: "৳76619.78",
      totalProduct: 711,
    },
    {
      id: 3,
      date: "13/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 4,
      date: "14/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 5,
      date: "15/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 6,
      date: "16/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 7,
      date: "17/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 8,
      date: "18/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 9,
      date: "19/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
    {
      id: 10,
      date: "20/09/2022",
      totalAmount: "৳9328.85",
      totalVat: "৳78219.78",
      totalProduct: 711,
    },
  ];
  const [report, setReport] = useState(salesReport);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;
  var options = {
    day: "numeric",
    year: "numeric",
    month: "numeric",

    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [Showdata, setShowdata] = useState(true);
  const cRef = useRef();

  function convert(date) {
    return new Date(date).toLocaleDateString("en-US", options);
  }

  const [dailyReport, setDailyReport] = useState([]);
  const getReport = () => {
    let url;
    if (date1 && date2) {
      url = `${BASE_URL}/api/v1/sales/daily-report/?start=${date1}&end=${date2}`;
    } else {
      url = `${BASE_URL}api/v1/sales/daily-report/`;
    }

    axios
      .get(url)
      .then((res) => {
        console.log(res?.data);
        const resData = res?.data?.data?.data?.map((curr) => ({
          ...curr,
          created_at: convert(curr.created_at),
        }));
        // console.log(resData.length, "--------------convert--------===========");
        setDailyReport(resData);
        setMainReportLength(res?.data?.data?.data);

        // console.log([...dailyReport ,  res.data.data.data.map(a=> new Date(a.created_at).toLocaleDateString(
        //   "en-US",
        //   options
        // ))])
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getReport();
    if (date1 === "undefined/undefined/" && date2 === "undefined/undefined/") {
      swal("Please select  dates");
    }
    // // setShowdata(false);
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
        const url = `${BASE_URL}api/v1/sales/daily-report/${id}`;
        axios
          .delete(url)
          .then(() => {
            getReport();
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

  // useEffect(() => {

  //   return filterDates;
  // }, [date1, date2]);
  // console.log(date1, "------------date------1111");

  // const filterDates = (from, to) => {
  //   if (!date1 || !date2) {
  //     swal("Please select two dates");
  //   } else if (
  //     date1 === "undefined/undefined/" ||
  //     date2 === "undefined/undefined/"
  //   ) {
  //     swal("Please select  dates");
  //   } else {
  //     setShowdata(true);
  //     const mainData = dailyReport.filter(
  //       (date) => date.created_at >= from && date.created_at <= to
  //     );
  //     setDailyReport(mainData);
  //   }
  // };
  const generateData = () => {
    if (!date1 && !date2) {
      swal("Please select two dates");
    } else if ((date1 === "undefined/undefined/" && date2 === "undefined/undefined/") || (date1 === "" && date2 === "")) {
      swal("Please select two dates");
    } else if (date1 === "undefined/undefined/" || date1 ==="") {
      swal("Please select  start Date");
    } else if (date2 === "undefined/undefined/" || date2 ==="") {
      swal("Please select  end Date");
    } else {
      getReport();
    }
  };

  // console.log(date1, date2);
  const HandlePrint = useReactToPrint({
    content: () => cRef.current,
    documentTitle: "Daily Sales Report",
    // onAfterPrint: () => swal("Printed"),
    bodyClass: "dis",
  });
  const handlePrints = () => {
    HandlePrint();
  };

  const keys = ["total_sales", "product", "created_at"];
  const getData = dailyReport?.filter((p) => keys.some((key) => p[key].toString().toLowerCase().includes(query)));
  const pageCount = Math.ceil(getData.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  if (!has_permissions(can_view_report)) {
    return <Permission />;
  }
  if (isLoading) {
    return <Loader />;
  }

  // console.log("showdata", Showdata);
  return (
    <div className="categorey-parent " style={{ height: "100%" }}>
      <div className="bg-white me-lg-4 me-md-3 me-1 px-3 rounded">
        <div className="py-3 d-flex justify-content-between align-items-center">
          <div>
            <h5>Daily Sales Report</h5>
            <input type="text" className="filter-input" placeholder="Search here" onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} />
          </div>
          <div className="d-flex">
            <input
              type="date"
              // date-format=""
              format="DD-MM-YYYY"
              className="date-input"
              // value={date1}
              onChange={(e) => {
                const date = e.target.value;
                // setShowdata(false);
                // date.split('-')
                // console.log(date.split('-')[0])
                setDate1(`${date.split("-")[1]}/${date.split("-")[2]}/${date.split("-")[0]}`);
              }}
            />
            <span className="mx-2 my-auto" placeholder="09-09-2022">
              {" "}
              To
            </span>
            <input
              type="date"
              className="date-input"
              // value={date2}
              onChange={(e) => {
                const date = e.target.value;
                // setShowdata(false);

                // date.split('-')
                // console.log(date.split('-')[0])
                setDate2(`${date.split("-")[1]}/${date.split("-")[2]}/${date.split("-")[0]}`);
              }}
            />
            <div
              className="button-div my-auto ms-2 px-3 py-2 text-white rounded"
              style={{ background: "black", cursor: "pointer" }}
              onClick={generateData}
            >
              <span> Generate</span>
            </div>
            {getData?.length > 0 && (
              <div
                className="button-div my-auto ms-2 px-2 py-2 text-white rounded"
                style={{ background: "black", cursor: "pointer" }}
                onClick={() => handlePrints()}
              >
                <span> Print</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "block", overflowX: "auto" }}>
          <table className="table_my pdf-table my-4" ref={cRef}>
            <thead className="d-none thed">Daily Report -- Date: {date1 && date2 ? `${date1} - ${date2}` : currentDate}</thead>
            <thead className="bg-dark text-white head-row" style={{ height: "50px", borderTopLeftRadius: "20px !important" }}>
              <tr className="">
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "280px",
                    textAlign: "center",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "350px",
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "200px",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "200px",
                  }}
                >
                  Total Amount
                </th>
                {/* <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "130px",
                  }}
                >
                  Status
                </th> */}

                <th
                  className="action"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    width: "150px",
                    textAlign: "center",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="tb">
              {getData.length !== 0
                ? getData.slice(pagesVisited, pagesVisited + usersPerPage).map((report) => (
                    <tr className="table-row">
                      <td className="text-center">{report.created_at}</td>
                      <td>{report.product}</td>
                      <td> {report.total_sales}</td>
                      <td>৳ {report.total_amount}</td>
                      {/* <td>
                      <p
                        className="p-2 rounded text-center fw-bold"
                        style={{
                          background: "#E0E0E0",
                          width: "60px",
                          fontSize: "14px",
                        }}
                      >
                        Active
                      </p>
                    </td> */}
                      <td className="action">
                        <div className="d-flex gap-3  flex-row-reverse justify-content-center">
                          {/* <div
                            className="edit-del blue d-none"
                          >
                            <ViewIcon />
                          </div> */}
                          {has_permissions(can_delete_report) ? (
                            <div className="edit-del red" onClick={() => deleteData(report.id)}>
                              <DeleteIcon />
                            </div>
                          ) : (
                            <div className="edit-del red" onClick={() => swal("Sorry , You are not able to delete report")}>
                              <DeleteIcon />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                : Showdata && (
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
          <div>
            <div className="row pag" style={{ marginTop: "30px", paddingBottom: "30px" }}>
              <div className="col-6 col-md-5">
                <p className="inter" style={{ color: "#AEAEB2", fontSize: "16px" }}>
                  Total Entries: <span style={{ color: "black", fontSize: "14px" }}>{mainReportLength.length}</span>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DailySalesReport;

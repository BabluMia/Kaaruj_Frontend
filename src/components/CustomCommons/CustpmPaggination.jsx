import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const CustpmPaggination = ({ allData }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(allData?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="row pag" style={{ marginTop: "30px" }}>
    <div className="col-6 col-md-4">
      <p className="inter" style={{ color: "#AEAEB2", fontSize: "16px" }}>
        Total Entries:{" "}
        <span style={{ color: "black", fontSize: "14px" }}>50</span>
      </p>
    </div>
    <div className="col-12 col-md-4 d-flex paggination-button">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  </div>
  );
};

export default CustpmPaggination;

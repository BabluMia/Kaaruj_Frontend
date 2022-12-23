import React from "react";
import AreaChart from "../dashboard/AreaChart";
import AreaChartComponents from "./AreaChartComponents";
import BarChartComponents from "./BarChartComponents";
import "./Report.css";

const Reports = () => {
  
  

  return (
    <div className="categorey-parent ">
      <div className="row bg-white mr-box2 rounded">
          <AreaChart />
      </div>
      <div className="row mt-4 mr-box2  justify-content-between ">
        <div className="col-6 ">
          <div className="  bg-white rounded px-2">
            <BarChartComponents/>
          </div>
        </div>
        <div className="col-6 ">
          <div className="px-2  bg-white rounded">
            <AreaChartComponents/>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Reports;

import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { useState } from "react";
import { BASE_URL } from "../Const/Url";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      // text: 'Chart.js Bar Chart',
    },
  },
};



const BarChartComponents = () => {
  const [filterQuery, setFilterQuery] = useState("week");
  const [labels, setlabels] = useState([]);
  const [ChartData, setChartData] = useState([]);
  // const labels = ["January", "February", "March", "April", "May", "June"];

 const data = {
  labels,
  datasets: [
    {
      label: "Invoice",
      data: ChartData,
      backgroundColor: "#F7CD2E",
    },
   
  ],
};
const getReport = () => {
  const url = `${BASE_URL}/api/v1/sales/chart_data_invoice_created/?filter=${filterQuery}`;
  axios
    .get(url)
    .then((res) => {
      
      setlabels(Object.keys(res.data.data.data));
      setChartData(Object.values(res.data.data.data));
    })
    .catch((err) => {
      const message = JSON.parse(err.request.response).message;
      console.log(err.request.response);
    });
};
useEffect(() => {
  getReport();
}, [filterQuery]);

  return (
    <div>
      <div className="d-flex justify-content-end pointer filter-select pt-2">
        <select
          name=""
          onChange={(e) => setFilterQuery(e.target.value)}
          id=""
          style={{ boderRadius: "4px" }}
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>

        
      </div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChartComponents;

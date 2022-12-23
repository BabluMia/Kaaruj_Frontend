import React from "react";
import { Line } from "react-chartjs-2";
// import * as faker from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { BASE_URL } from "../Const/Url";
import { useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  tooltips: {
    callbacks: {
      title: "hlw",
      label: "hi",
    },
  },
};

// const labels = [
//   "Saturday",
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
// ];
// const yData = ['50K','100K','150K','200K']

const AreaChart = () => {
  const [filterQuery, setFilterQuery] = useState("week");
  const [labels, setlabels] = useState([]);
  const [ChartData, setChartData] = useState([]);
  // const yData = [200, 20, 70, 100, 20, 200, 350];
  const [dailyReport, setDailyReport] = useState([]);

  const getReport = () => {
    const url = `${BASE_URL}api/v1/sales/chart_data1/?filter=${filterQuery}`;
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
  
  // console.log(ChartData,'-=-------------=============')
  // console.log(labels,'-=-------------=============')
 

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        Tooltip: false,
        label: "Sales Report",
        data: ChartData,
        borderColor: " rgba(144, 238, 2, 1)",
        backgroundColor: "#00aeef",
        lineTension: 0.2,
      },
    ],
  };
  // var options = {
  //   day: "numeric",
  //   year: "numeric",
  //   month: "numeric",
  // };
  //   const [startDate,setStartDate] = useState('')
  //   const [endDate,setEndDate] = useState('')
  //   var dates = [];
  //   for (let I = 0; I < Math.abs(7); I++) {
  //     dates.push(new Date(new Date().getTime() - ((7 >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toLocaleString());

  // }
  // useEffect(()=>{
  //   setStartDate(dates[0].split(',')[0])
  //     setEndDate(dates[6].split(',')[0])
  // },[startDate,endDate])

  // function convert(date) {
  //   return new Date(date).toLocaleDateString("en-US", options);
  // }
  // const url = `${BASE_URL}/api/v1/sales/daily-report/`;
  // const [isLoading, setIsLoading] = useState(true);

  // const [sale, setSale] = useState([]);

  // console.log('-------------------------------')
  // console.log(filterQuery,'-----------filter query--------')
  // console.log('-------------------------------')
  return (
    <div className="invoice-main mb-4">
      <div className="d-flex justify-content-end pointer filter-select">
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
      <Line className="area-h" Tooltip options={options} data={data} />
    </div>
  );
};

export default AreaChart;

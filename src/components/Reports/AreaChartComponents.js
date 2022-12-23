import React from 'react';
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
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import faker from 'faker';
import { useState } from 'react';
import { BASE_URL } from '../Const/Url';
import axios from 'axios';
import { useEffect } from 'react';
  
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
        position: 'top' 
      },
      title: {
        display: true,
        // text: 'Chart.js Line Chart',
      },
    },
  };
  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
   

const AreaChartComponents = () => {
  const [filterQuery, setFilterQuery] = useState("week");
  const [labels, setlabels] = useState([]);
  const [ChartData, setChartData] = useState([]);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Customer',
        data: ChartData,
        borderColor: '#66AD47',
        backgroundColor: '#03203C',
        lineTension: 0.2,
      },
    ],
  };
  const getReport = () => {
    const url = `${BASE_URL}/api/v1/sales/chart_data_customer_created/?filter=${filterQuery}`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res)
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
        
        <Line options={options} data={data} />
      </div>
        
    );
};

export default AreaChartComponents;
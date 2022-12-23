import axios from 'axios';
import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

const UseData = (api) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  useEffect(() =>{
    axios
      .get(api)
      .then((res) => {
        setData(res.data.data.results );
        setLoading(false)

      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  }, [api,data]);
  return [data,loading];
};

export default UseData;
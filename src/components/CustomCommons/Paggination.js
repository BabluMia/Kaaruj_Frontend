import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Paggination = () => {
  
    return (
        <div className="row pag" style={{ marginTop: "30px" }}>
        <div className="col-6 col-md-4">
          <p className="inter" style={{ color: "#AEAEB2", fontSize: "16px" }}>
            Total Entries:{" "}
            <span style={{ color: "black", fontSize: "14px" }}>50</span>
          </p>
        </div>
        <div className="col-12 col-md-4 d-flex paggination-button">
          <button className='first'>
            <p style={{ fontSize: "18px" }}>&#60;</p>
          </button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>...</button>
          <button>10</button>
          <button className='first'>
            <p style={{ fontSize: "18px" }}>&#62;</p>
          </button>
        </div>
      </div>
    );
};

export default Paggination;
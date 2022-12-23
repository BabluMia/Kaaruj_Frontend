import React from "react";
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";

import lottie from "lottie-web";
import { Link } from "react-router-dom";

const Page404 = ({setHideToolbar}) => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container:container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData:require('../../assets/Lottie/lottie1.json')
    });
  }, []);

  useEffect(() => {
    setHideToolbar(true);
    return () => {
        setHideToolbar(false);
    };
}, []);
  return (
    <div className="c-app c-default-layout flex-row align-items-center" >
      <div className="container" style={{height:'100vh'}}>
        <Row className="justify-content-center d-flex">
          <Col md="6">
            <div className="clearfix mt-5">
              {/* <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-muted float-left">The page you are looking for was not found.</p> */}
              <div ref={container}></div>
              <button className="btn btn-outline-success m-auto"><Link to="/">Go TO Dashboard</Link></button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Page404;

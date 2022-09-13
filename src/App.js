import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { Routes, Route } from "react-router";
// import Dashboard from "./modules/dashboard/component/Dashboard";

import Header from "./navbar/component/Header"

function App() {
  const [bodyWidth, setBodyWidth] = useState(false);
  const [hideToolbar, setHideToolbar] = useState(false);
  return (
    <div>
      <Router>
        <div
          className={` ${
            !bodyWidth && !hideToolbar
              ? "main-content"
              : !hideToolbar
              ? "main-content-collapsed"
              : ""
          }`}
        >
          {!hideToolbar && <Header setBodyWidth={setBodyWidth} />}
          <div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

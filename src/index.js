import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HRCode from "./HRCode";
import AttendanceCD from "./AttendanceCD";
import Position from "./Position";
import Department from "./Deptartment";
import HRGroup from "./HRGroup";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/insertAttendanceCD" component={AttendanceCD} />
    <Route path="/insertHRGroup" component={HRGroup} />
    <Route path="/insertHRCode" component={HRCode} />
    <Route path="/insertPosition" component={Position} />
    <Route path="/insertDept" component={Department} />
  </BrowserRouter>,
  document.getElementById("insertAttendanceForm")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

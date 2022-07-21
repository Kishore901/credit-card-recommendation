import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Recommend from "./Recommend";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />

    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

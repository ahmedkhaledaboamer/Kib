import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout/layout";

function App() {
  return (
    <BrowserRouter>
      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      {/* App Layout */}
      <Layout />
    </BrowserRouter>
  );
}

export default App;

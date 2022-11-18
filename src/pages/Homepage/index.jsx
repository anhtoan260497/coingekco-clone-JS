import Dashboard from "components/Dashboard";
import MenuTopPage from "components/MenuTopPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <MenuTopPage />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Homepage;

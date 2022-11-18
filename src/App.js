import React from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import Homepage from "pages/Homepage";
import Detail from "pages/Detail";

function App() {
  const isDay = useSelector((state) => state.darkModeSlice.isDay);
  return (
    <div className={clsx("App", !isDay && "dark")}>
      <div className="App-container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:name" element={<Detail />} />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;

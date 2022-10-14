import React from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import MenuTopPage from "components/MenuTopPage";
import { useSelector } from "react-redux";
import clsx from "clsx";

function App() {
  const isDay = useSelector(state => state.darkModeSlice.isDay)
  return (
    <div className={clsx('App',!isDay && 'dark')}>
      <div className="App-container">
        <MenuTopPage />
      </div>
    </div>
  );
}

export default App;

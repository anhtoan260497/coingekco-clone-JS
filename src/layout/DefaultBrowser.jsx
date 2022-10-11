import React, { useEffect, useRef } from "react";
import Header from "components/Header/HeaderBrowser";
import { BrowserView } from "react-device-detect";
import App from "App";
import { useSelector } from "react-redux";
import autoAnimate from "@formkit/auto-animate";

function DefaultLayoutBrowser() {
  const isDay = useSelector(state => state.darkModeSlice.isDay)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const styleDarkMode  = {
    backgroundColor :  !isDay ? 'rgb(18,18,18)' : 'white',
    color : !isDay ?  'white' : 'rgb(43,43,43)', 
  }

  return (
    <BrowserView style={styleDarkMode} className="transition">
      <Header />
      <App />
    </BrowserView>
  );
}

export default DefaultLayoutBrowser;

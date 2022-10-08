import React from "react";
import Header from "components/Header/HeaderBrowser";
import { BrowserView } from "react-device-detect";
import App from "App";

function DefaultLayoutBrowser() {
  return (
    <BrowserView>
      <Header />
      <App />
    </BrowserView>
  );
}

export default DefaultLayoutBrowser;

import React from "react";
import { MobileView } from "react-device-detect";
import App from "App";
import HeaderMobile from "components/Header/HeaderMobile";

function DefaultLayoutMobile() {

  return (
    <MobileView >
      <HeaderMobile />
      <App />
    </MobileView>
  );
}

export default DefaultLayoutMobile;

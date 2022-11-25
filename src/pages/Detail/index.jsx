import axios from "axios";
import Breadcrumbs from "components/Breadcrumbs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

Detail.propTypes = {};

function Detail() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const id = location.pathname.slice(1, location.pathname.length);

  useEffect(() => {
    const getCoinData = async () => {
      setIsLoading(true);
      try {
        const config = {
          method: "get",
          url: `https://api.coingecko.com/api/v3/coins/${id}`,
          headers: {
            "Content-Type": "text/plain",
          },
        };
        const respone = await axios(config);
        const result = respone.data;
        setCoinData(result);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    getCoinData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div>
          <Breadcrumbs name={coinData.name} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Detail;

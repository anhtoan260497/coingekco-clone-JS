import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import ToggleButton from "UIComponents/ToggleButton";
import { Table } from "antd";
import { numberWithCommas } from "helper";
import axios from "axios";
import clsx from "clsx";

const columns = [
  {
    title: <div className="font-bold"></div>,
    dataIndex: "starNumber",
    sorter: (a, b) => a.number - b.number,
    className : 'text-right star-col'
  },
  {
    title: <div className="font-bold text-right">#</div>,
    dataIndex: "key",
    sorter: (a, b) => a.number - b.number,
    className : 'key-col'
  },
  {
    title: <div className="font-bold ">Coin</div>,
    dataIndex: "coinLabel",
    sorter: (a, b) => (a.name).charCodeAt(0) - (b.name).charCodeAt(0) < 0 ? true : false,
    className : 'text-right'
  },
  {
    title: <div className="font-bold text-right">Price</div>,
    dataIndex: "price",
    sorter: (a, b) => parseInt(a.price.slice(1,a.price.length)) - parseInt(b.price.slice(1,a.price.length)) < 0 ? true : false,
    className : 'text-right tracking-tight number-display'
  },
  {
    title: <div className="font-bold text-right">1h</div>,
    dataIndex: "percentHourDisplay",
    sorter: (a, b) => a.percentHour.slice(0,a.percentHour.length-1) -b.percentHour.slice(0,b.percentHour.length-1) < 0 ? true : false,
    className : 'text-right '
    
  },
  {
    title: <div className="font-bold">24h</div>,
    dataIndex: "percentDayDisplay",
    sorter: (a, b) =>  a.percentDay.slice(0,a.percentDay.length-1) -b.percentDay.slice(0,b.percentDay.length-1) < 0 ? true : false,
    className : 'text-right '

  },
  {
    title: <div className="font-bold text-right">7d</div>,
    dataIndex: "percentWeekDisplay",
    sorter: (a, b) =>  a.percentWeek.slice(0,a.percentWeek.length-1) -b.percentWeek.slice(0,b.percentWeek.length-1) < 0 ? true : false,
    className : 'text-right '

  },
  {
    title: <div className="font-bold text-right">24h Volume</div>,
    dataIndex: "24hVol",
    sorter: (a, b) =>  parseInt(a['24hVol'].slice(1,a['24hVol'].length)) - parseInt(b['24hVol'].slice(1,a['24hVol'].length)) < 0 ? true : false,
  },

  {
    title: <div className="font-bold text-right">Mkt Cap</div>,
    dataIndex: "marketCap",
    sorter: (a, b) => parseInt(a.marketCap.slice(1,a.marketCap.length)) - parseInt(b.marketCap.slice(1,a.marketCap.length)) < 0 ? true : false,
    className : 'text-right '
  },
];


function DashboardCoins() {
 
  
  const [dashboardData, setDashboardData] = useState([]);

  const onChange = () => {
    // console.log("params", pagination, filters, sorter, extra);
    console.log()
  };

  const addToWishList = () => {
    console.log('hihi')
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const respone = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d");
        const result = respone.data
        console.log(result)
        const dataList = result.map((item,key) => (
          {
            starNumber : <FontAwesomeIcon className="icon-wish-list" key={key} onClick={addToWishList} icon={faStar} />,
            number : key+1,
            key: <div className="flex items-center gap-1 font-bold" key={key}>{key+1}</div>,
            coinLabel: (
              <div className="flex items-center gap-2 font-bold" key={key}>
                <img
                  className="coin-icon"
                  src={item.image}
                />
                <span className="coin-name">{item.name}</span>
                <span className="coin-key">{item.symbol}</span>
              </div>
            ),
            name: item.name,
            price: item.current_price >= 1 ? `$${numberWithCommas(item.current_price.toFixed(2))}` : `$${item.current_price.toFixed(6)}`,
            percentHour: `${(item.price_change_percentage_1h_in_currency).toFixed(1)}%`,
            percentDay: `${(item.price_change_percentage_24h_in_currency).toFixed(1)}%`,
            percentWeek: `${(item.price_change_percentage_7d_in_currency).toFixed(1)}%`,
            percentHourDisplay: <p className={clsx('text-right','number-display',item.price_change_percentage_1h_in_currency < 0 ? "text-red-600" : "text-[#8dc647]")} key={key}>{(item.price_change_percentage_1h_in_currency).toFixed(1)}%</p>,
            percentDayDisplay:  <p className={clsx('text-right','number-display',item.price_change_percentage_24h_in_currency < 0 ? "text-red-600" : "text-[#8dc647]")} key={key}>{(item.price_change_percentage_24h_in_currency).toFixed(1)}%</p>,
            percentWeekDisplay: <p className={clsx('text-right','number-display',item.price_change_percentage_7d_in_currency < 0 ? "text-red-600" : "text-[#8dc647]")} key={key}>{(item.price_change_percentage_7d_in_currency).toFixed(1)}%</p>,
            marketCap: <p className="text-right number-display text-light">${numberWithCommas(item.market_cap)}</p>,
            '24hVol' :  <p className="text-right number-display text-light">${numberWithCommas(item.total_volume)}</p>,
            image: item.image,
          }
        ))
        setDashboardData(dataList)
      } catch (err) {
        console.log(err);
      }
    };
    getData()
  },[]);

  return (
    <div className="dashboard-coin mt-3">
      <div className="dashboard-coin-option flex justify-between items-center">
        <button className="categories-button rounded-full font-bold">
          All Categories
        </button>
        <div className="flex items-center gap-2">
          <ToggleButton className="toogle" />
          Show Fully Diluted Valuation
          <Tooltip placement="top" title={"text"}>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </Tooltip>
        </div>
      </div>
      <div className="dashboard-coin-list mt-2">
        <Table
          columns={columns}
          dataSource={dashboardData}
          onChange={onChange}
          pagination={false}
          onRow={(record) => {
            return {
              onClick : () => {
                console.log(record)
              }
            }
          }
          }
        />
      </div>
    </div>
  );
}

export default DashboardCoins;

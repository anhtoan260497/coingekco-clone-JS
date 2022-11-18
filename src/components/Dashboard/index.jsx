import { faTurnDown, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import DashboardCoins from "components/DashboardCoins";
import { numberWithCommas } from "helper";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import ToggleButton from "UIComponents/ToggleButton";
import "./styles.scss";

function Dashboard() {
  //variable
  const globalData = useSelector((state) => state.coinSlice.global);
  const [isCheckToggle, setIsCheckToggle] = useState(false);
  const [isShowmoreOverview, setIsShowmoreOverview] = useState(false);
  const isDay = useSelector((state) => state.darkModeSlice.isDay);

  // function
  const getIsCheckToggleButton = (isCheck) => {
    setIsCheckToggle(isCheck);
  };

  // render function
  const renderOverview = () => {
    if (!globalData.marketCap) return;
    return (
      <div className="dashboard-overview">
        <p>
          The global cryptocurrency market cap today is $
          {globalData?.marketCap?.value.slice(0, 3)} Billion, a
          <span
            className={
              globalData?.marketCap?.percent > 0
                ? "mx-1 turn-down text-[#8dc647]"
                : "mx-1 text-red-600"
            }>
            {globalData?.marketCap?.percent}%
            {globalData?.marketCap?.percent > 0 ? (
              <FontAwesomeIcon
                className="turn-down text-[#8dc647]"
                icon={faTurnUp}
              />
            ) : (
              <FontAwesomeIcon
                className="turn-down text-red-600"
                icon={faTurnDown}
              />
            )}
          </span>
          change in the last 24 hours.
          <span
            className="ml-1 cursor-pointer"
            onClick={() => setIsShowmoreOverview(!isShowmoreOverview)}>
            {!isShowmoreOverview ? "Read more" : "Hide"}
          </span>
        </p>
        {isShowmoreOverview && (
          <p>
            Total cryptocurrency trading volume in the last day is at $
            {`${globalData.volume24h.value.slice(0, 4)} `}
            Billion. Bitcoin dominance is at{" "}
            {globalData.DominateCoins.value[0].value.toFixed(1)}% and Ethereum
            dominance is at {globalData.DominateCoins.value[1].value.toFixed(1)}
            %. CoinGecko is now tracking {globalData.coins.value}{" "}
            cryptocurrencies. Popular trends of the industry right now are DeFi
            and Play to Earn.
          </p>
        )}
      </div>
    );
  };

  const renderStatsList = () => {
    if (!globalData.marketCap) return;
    console.log(globalData.marketCap.percent)
    const listData = [
      {
        label: "Market Capitalization",
        value: `$${numberWithCommas(globalData.marketCap.value)}`,
        percent: `${globalData.marketCap.percent}`,
        color: globalData.marketCap.percent > 0 ? "bg-[#8dc647]" : "bg-red-600",
      },
      {
        label: "24h Trading Volume",
        value: numberWithCommas(globalData.volume24h.value),
        color : 'bg-[#8dc647]'
      },
      {
        label: "Bitcoin Market Cap Dominance",
        value: `${(globalData.DominateCoins.value[0].value).toFixed(1)}%`,
      },
      {
        label: "# of Coins",
        value: globalData.coins.value,
      },
    ];
    return listData.map((item) => {
      console.log(item.percent)
      return (
        <div className="stats-item flex" key={item.label}>
          <div
            className={clsx(
              "stats-color",
              "mr-2",
              item.color ? `${item.color}` : "bg-neutral-400"
            )}></div>
          <div className="flex flex-col justify-center py-3">
            <div className="stats-item-number flex items-center gap-3">
              <p className="stats-number m-0">{item.value}</p>
             {item.percent && <p className={clsx('stats-percent','m-0','flex','items-center',item.percent > 0 ? 'text-[#8dc647]' : 'text-red-600')}>
               {item.percent}% {item.percent > 0 ? <FontAwesomeIcon className="text-[#8dc647]" icon={faTurnUp} /> : <FontAwesomeIcon className="text-red-600" icon={faTurnDown} /> }
              </p>}
            </div>
            <p className="stats-description my-0 mb-2">{item.label}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={clsx(
        "dashboard-coins",
        "text-left",
        "mt-2",
        !isDay && "dark-dashboard"
      )}>
      <div className="flex items-center gap-3">
        <h1 className="dashboard-title">Cryptocurrency Prices by Market Cap</h1>
        {!isMobile && (
          <>
            <ToggleButton
              className="toogle"
              getIsCheckToggleButton={getIsCheckToggleButton}
            />
            <p className="m-0 text-sm font-semibold">Show Stats</p>
          </>
        )}
      </div>
      <div>{renderOverview()}</div>
      <div className="show-stats">
        <div className=""></div>
      </div>
      {isMobile && (
        <div className="flex items-center gap-3">
          <ToggleButton
            className="toogle"
            getIsCheckToggleButton={getIsCheckToggleButton}
          />{" "}
          <p className="m-0 text-white text-sm font-semibold">Show Stats</p>
        </div>
      )}
      {isCheckToggle ? (
        <div className="stats-container flex gap-3">{renderStatsList()}</div>
      ) : ''}

      <DashboardCoins />
    </div>
  );
}

export default Dashboard;

import React from "react";
import { Fragment, useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "features/coinSlice";

const initialHeaderMenuLeft = [
  {
    label: "Cryptocurrencies",
    childOptions: [
      { label: "By Market Cap" },
      { label: "New Cryptocurrencies" },
      { firstItem: true, label: "Categories", isNew: true },
      { label: "Watchlists" },
      { label: "Gainers & Losers" },
      { label: "High Volume" },
      { firstItem: true, label: "All Coins" },
      { label: "Compare Coins", isNew: true },
      { label: "Global Chart" },
    ],
  },
  {
    label: "Exchanges",
    childOptions: [
      { label: "Crypto Exchanges" },
      { label: "Decentralized Exchanges" },
      { label: "Derivatives" },
    ],
  },
  {
    label: "NFT",
    childOptions: [
      { label: "NFT Floor Price", isNew: true },
      { label: "NFT Related Coins" },
    ],
  },
  {
    label: "Learn Crypto",
    childOptions: [
      { label: "All Crypto Articles" },
      { label: "Analysis" },
      { label: "Guides" },
      { firstItem: true, label: "Glossary" },
      { label: "Methodology" },
      { firstItem: true, label: "Videos" },
      { label: "Postcast" },
      { label: "Newsletter" },
      { label: "Research Reports" },
    ],
  },
  {
    label: "Products",
    childOptions: [
      { label: "GeckoTerminal", isNew: true },
      { label: "CoinGecko Premium" },
      { label: "CoinGecko App" },
      { label: "Crypto Portfolio" },
      { label: "Crypto API" },
      { label: "Crypto Widget" },
      { firstItem: true, label: "GeckoCon 2022" },
      { label: "CoinGecko Store" },
    ],
  },
];

// console.log(coinData)
const Header = () => {
  //state
  const [headerMenuLeft] = useState(initialHeaderMenuLeft);
  const [onFocusSearchHeader, setOnFocusSearchHeader] = useState();
  const trendingDataList = useSelector((state) => state.coinSlice.coins);
  const isLoadingTrending = useSelector((state) => state.coinSlice.isLoading);
  console.log(trendingDataList);
  const dispatch = useDispatch();

  //methods - function
  const getTrendingData = async () => {
    await dispatch(getTrending());
  };

  //render function

  const renderMenuList = () => {
    return headerMenuLeft.map((item, idx) => {
      return (
        <div className="menu-left-options" key={idx}>
          <a href="/#" className="label">
            {item.label}
          </a>
          <div className="menu-child-options flex flex-col justify-center items-center">
            {item.childOptions.map((childItem, childIdx) => {
              return childItem.firstItem ? (
                <Fragment key={childIdx}>
                  <div className="slash"></div>
                  <a className="child-option py-1" href="dasdas">
                    {childItem.label} <span className="new-label">New</span>
                  </a>
                </Fragment>
              ) : (
                <a className="child-option py-1" href="dasdas" key={childIdx}>
                  {childItem.label}
                </a>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const triggerInputTrending = (type) => {
    if (type === "focus") {
      setOnFocusSearchHeader(true);
      if (trendingDataList.length === 0) getTrendingData();
      return;
    }
    setOnFocusSearchHeader(false);
  };

  const renderTrendingList = () => {
    if (!isLoadingTrending) {
      return trendingDataList.map((item, key) => {
        return (
          <a
            className="search-item px-3 py-2 flex justify-between items-center"
            key={key}
            href="##">
            <div className="search-item-left flex justify-between items-center gap-2">
              <img src={item.item.thumb} alt={item.item.id} />
              <span className="search-item-name">{item.item.name}</span>
              <span className="search-item-symbol">({item.item.symbol})</span>
            </div>
            <span className="search-item-rank">
              #{item.item.market_cap_rank}
            </span>
          </a>
        );
      });
    }
  };

  //side effect - useEffect hook

  return (
    <div className="header-container-fluid">
      <div className="header-container mx-auto flex justify-between">
        <div className="header-left flex justify-between items-center">
          <img
            className="header-logo"
            src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
            alt="coin-gecko-logo"
          />
          {renderMenuList()}
        </div>
        {onFocusSearchHeader ? (
          <div className="header-right trending flex justify-between items-center">
            <div
              className="header-right-input active-trending"
              onFocus={() => setOnFocusSearchHeader(true)}
              onBlur={() => setOnFocusSearchHeader(false)}>
              <input
                id="trending-input"
                className="input-trending active-trending"
                type="text"
                placeholder="Search token name or exchange"
              />
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              <FontAwesomeIcon className="icon close" icon={faXmark} />
            </div>
            <div className="trending-search rounded">
              <p className="trending-search-title">Trending Search 🔥</p>
              <div className="slash my-1"></div>
              {!isLoadingTrending && renderTrendingList()}
            </div>
          </div>
        ) : (
          <div className="header-right flex justify-between items-center">
            <a className="anchor-option" href="##">
              Portfolio
            </a>
            <a className="anchor-option" href="##">
              Login
            </a>
            <a className="header-signup" href="##">
              Sign Up
            </a>
            <div
              className="header-right-input"
              onFocus={() => triggerInputTrending("focus")}
              onBlur={() => triggerInputTrending("blur")}>
              <input
                className="input-trending"
                type="text"
                placeholder="Search"
              />
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

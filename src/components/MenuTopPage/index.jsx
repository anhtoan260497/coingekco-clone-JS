import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";
import "./styles.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function MenuTopPage() {
  // variables
  const topHeaderMenuList = [
    {
      label: "Portfolio",
      slug: "",
      isSpecial: true,
    },
    {
      label: "Coins",
      slug: "",
      isSpecial: false,
    },
    {
      label: "New Coins",
      slug: "",
      isSpecial: false,
    },
    {
      label: "Gainers & Losers",
      slug: "",
      isSpecial: false,
    },
    {
      label: "Categories",
      slug: "",
      isSpecial: false,
    },
    {
      label: "NFT",
      slug: "",
      isSpecial: false,
    },
    {
      label: "DeFi",
      slug: "",
      isSpecial: false,
    },
    {
      label: "Gaming",
      slug: "",
      isSpecial: false,
    },
    {
      label: "BNB",
      slug: "",
      isSpecial: false,
    },
    {
      label: "Solana",
      slug: "",
      isSpecial: false,
    },
    {
      label: "Avalance",
      slug: "",
      isSpecial: false,
    },
  ];
  const [activeItem, setActiveItem] = useState(topHeaderMenuList[1].label);
  const isDay = useSelector(state => state.darkModeSlice.isDay)

  // render function
  const renderTopMenuList = () => {
    return topHeaderMenuList.map((item) => {
      return (
        <li
          key={item.label}
          className={clsx("menu-item","flex" , item.label === activeItem && "active")}
          onClick={() => {
            setActiveItem(item.label);
          }}>
          {item.isSpecial && <FontAwesomeIcon className="self-center active-icon mr-1" icon={faStar} />}
          {item.label}
        </li>
      );
    });
  };

  return (
    <div className={clsx('menu-top-page',!isDay && 'dark')}>
      <ul className="flex m-0 py-3 items-center">{renderTopMenuList()}</ul>
    </div>
  );
}

export default MenuTopPage;

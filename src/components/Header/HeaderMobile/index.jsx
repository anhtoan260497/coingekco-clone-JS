import {
  faBars,
  faBookmark,
  faUser,
  faXmark,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, Modal } from "antd";
import { getTrending } from "features/coinSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

const menuList = [
  {
    label: "Cryptocurrencies",
    child: [
      {
        name: "By Marker Cap",
        slug: "",
      },
      {
        name: "Categories",
        slug: "",
      },
      {
        name: "Gainers & Losers",
        slug: "",
      },
      {
        name: "All Coins",
        slug: "",
      },
      {
        name: "Global Chart",
        slug: "",
      },
      {
        name: "New Cryptocurrencies",
        slug: "",
      },
      {
        name: "Watchlists",
        slug: "",
      },
      {
        name: "High Volume",
        slug: "",
      },
      {
        name: "Compare Coins",
        slug: "",
      },
    ],
  },
  {
    label: "Exchanges",
    child: [
      {
        name: "Crypto Exchanges",
        slug: "",
      },
      {
        name: "Derivaties",
        slug: "",
      },
      {
        name: "Decentralized Exchanges",
        slug: "",
      },
    ],
  },
  {
    label: "NFT",
    child: [
      {
        name: "NFT Floor Price",
        slug: "",
      },
      {
        name: "NFT Related Coins",
        slug: "",
      },
    ],
  },
  {
    label: "Learn Crypto",
    child: [
      {
        name: "All Crypto Articles",
        slug: "",
      },
      {
        name: "Guides",
        slug: "",
      },
      {
        name: "Methodology",
        slug: "",
      },
      {
        name: "Podcast",
        slug: "",
      },
      {
        name: "Research Reports",
        slug: "",
      },
      {
        name: "Analysis",
        slug: "",
      },
      {
        name: "Glossary",
        slug: "",
      },
      {
        name: "Videos",
        slug: "",
      },
      {
        name: "Newsletter",
        slug: "",
      },
    ],
  },
  {
    label: "Products",
    child: [
      {
        name: "CoinGecko Premium",
        slug: "",
      },
      {
        name: "Crypto Portfolio",
        slug: "",
      },
      {
        name: "Crypto Widget",
        slug: "",
      },
      {
        name: "GeckoCon 2022",
        slug: "",
      },
      {
        name: "CoinGecko App",
        slug: "",
      },
      {
        name: "Crypto API",
        slug: "",
      },
      {
        name: "CoinGecko Store",
        slug: "",
      },
    ],
  },
  {
    label: "Portfolio",
    url: "",
    child: [],
  },
  {
    label: "Explore",
    child: [
      {
        name: "Bitcoin Price",
        slug: "",
      },
      {
        name: "DeFi Coins",
        slug: "",
      },
      {
        name: "Gaming Coins",
        slug: "",
      },
      {
        name: "Ethereum Price",
        slug: "",
      },
      {
        name: "Metaverse Coins",
        slug: "",
      },
      {
        name: "Meme Coins",
        slug: "",
      },
    ],
  },
  {
    label: "Resources",
    child: [
      {
        name: "Perpetuals",
        slug: "",
      },
      {
        name: "Bitcoin Treasury",
        slug: "",
      },
      {
        name: "Crypto News",
        slug: "",
      },
    ],
  },
  {
    label: "GeckoTerminal",
    url: "",
    target: "_blank",
    child: [],
  },
  {
    label: "About CoinGecko",
    child: [
      {
        name: "About Us",
        slug: "",
      },
      {
        name: "Careers",
        slug: "",
      },
      {
        name: "Branding Guides",
        slug: "",
      },
    ],
  },
  {
    label: "Help",
    child: [
      {
        name: "Help Center",
        slug: "",
      },
      {
        name: "FAQ",
        slug: "",
      },
      {
        name: "Bug Bounty",
        slug: "",
      },
    ],
  },
];

function HeaderMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowTrendingSearch,setIsShowTrendingSearch] =  useState(false)
  const trendingDataList = useSelector((state) => state.coinSlice.coins);
  const isLoadingTrending = useSelector((state) => state.coinSlice.isLoading);
  const dispatch = useDispatch()

  // const onClick = (e) => {
  //     console.log('click ', e);
  // };

  // // function
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowTrendingSearch = () => {
    const showTrendingSearch = !isShowTrendingSearch
    setIsShowTrendingSearch(showTrendingSearch)
    if(!showTrendingSearch) return 
    if (trendingDataList.length === 0) dispatch(getTrending());
  }


  // render function

  const renderMenu = () => {
    return menuList.map((item) => {
      if (!item.child) {
        return (
          <Menu.Item key={item.label}>
            <a href={item.slug}>{item.label}</a>
          </Menu.Item>
        );
      }
      return (
        <Menu.SubMenu key={item.label} title={item.label}>
          {item.child.map((childItem) => (
            <Menu.Item key={childItem.name}>
              <a href={childItem.slug}>{childItem.name}</a>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      );
    });
  };

  const renderHeaderModalMobile = () => {
    return (
      <div className="header-modal-mobile flex justify-between items-center">
        <button className="modal-close-x" onClick={handleCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <img
          src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
          alt="logo"
        />
        <a href="https://www.coingecko.com/en/premium/pricing">Subscribe</a>
      </div>
    );
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

  return (
    <div className="header-mobile-container-fluid">
      <div className="header-mobile-container">
        <div className="header-top flex items-center justify-between">
          <Button
            className="header-menu-button"
            type="primary"
            onClick={showModal}>
            <FontAwesomeIcon className="icon" icon={faBars} />
          </Button>
          <a
            className="header-logo flex items-center"
            href="https://www.coingecko.com/">
            <img
              src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
              alt="logo"
            />
          </a>
          <div className="header-user flex items-center justify-end">
            <a href="https://www.coingecko.com/account/rewards">
              <img
                src="https://static.coingecko.com/s/candy_notification_web-a560ca6de9e0daaeb05eb6fe3dae7062684f63249dbf371568e7b062a3456e3e.png"
                alt="reward"
              />
            </a>
            <a href="https://www.coingecko.com/account/rewards">
              <FontAwesomeIcon className="icon" icon={faBookmark} />
            </a>
            <a href="https://www.coingecko.com/account/rewards">
              <FontAwesomeIcon className="icon" icon={faUser} />
            </a>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-search">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
            <input onFocus={handleShowTrendingSearch} type="text" placeholder="Search"/> 
            </div>
        </div>
        <div className="header-bottom-trending">
        <div className="trending-search rounded">
              <p className="trending-search-title">Trending Search 🔥</p>
              <div className="slash my-1"></div>
              {!isLoadingTrending && renderTrendingList()}
            </div>
        </div>
      </div>
      <Modal
        className="modal"
        title={renderHeaderModalMobile()}
        open={isModalOpen}
        onCancel={handleCancel}>
        <Menu mode="inline">{renderMenu()}</Menu>
      </Modal>

    </div>
  );
}

export default HeaderMobile;

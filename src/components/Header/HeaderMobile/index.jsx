import { faBars,faBookmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, Modal } from "antd";
import React, { useState } from "react";
import "./styles.scss";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const menuList = [
  {
    label : 'Cryptocurrencies',
    child : [
      {
        name : 'By Marker Cap',
        slug : ''
      },
      {
        name : 'Categories',
        slug : ''
      },
      {
        name : 'Gainers & Losers',
        slug : ''
      },
      {
        name : 'All Coins',
        slug : ''
      },
      {
        name : 'Global Chart',
        slug : ''
      },
      {
        name : 'New Cryptocurrencies',
        slug : ''
      },
      {
        name : 'Watchlists',
        slug : ''
      },
      {
        name : 'High Volume',
        slug : ''
      },
      {
        name : 'Compare Coins',
        slug : ''
      }
    ]
  },
  {
    label : 'Exchanges',
    child : [
      {
        name : 'Crypto Exchanges',
        slug : ''
      },
      {
        name : 'Derivaties',
        slug : ''
      },
      {
        name : 'Decentralized Exchanges',
        slug : ''
      },
    ]
  },
  {
    label : 'NFT',
    child : [
      {
        name : 'NFT Floor Price',
        slug : ''
      },
      {
        name : 'NFT Related Coins',
        slug : ''
      }
    ]
  },
  {
    label : 'Learn Crypto',
    child : [
      {
        name : 'All Crypto Articles',
        slug : ''
      },
      {
        name : 'Guides',
        slug : ''
      },
      {
        name : 'Methodology',
        slug : ''
      },
      {
        name : 'Podcast',
        slug : ''
      },
      {
        name : 'Research Reports',
        slug : ''
      },
      {
        name : 'Analysis',
        slug : ''
      },
      {
        name : 'Glossary',
        slug : ''
      },
      {
        name : 'Videos',
        slug : ''
      },
      {
        name : 'Newsletter',
        slug : ''
      }
    ]
  },
  {
    label : 'Products',
    child : [
      {
        name : 'CoinGecko Premium',
        slug : ''
      },
      {
        name : 'Crypto Portfolio',
        slug : ''
      },
      {
        name : 'Crypto Widget',
        slug : ''
      },
      {
        name : 'GeckoCon 2022',
        slug : ''
      },
      {
        name : 'CoinGecko App',
        slug : ''
      },
      {
        name : 'Crypto API',
        slug : ''
      },
      {
        name : 'CoinGecko Store',
        slug : ''
      }
    ]
  },
  {
    label : 'Portfolio',
    url : '',
    child : []
  },
  {
    label : 'Explore',
    child : [
      {
        name : 'Bitcoin Price',
        slug : ''
      },
      {
        name : 'DeFi Coins',
        slug : ''
      },
      {
        name : 'Gaming Coins',
        slug : ''
      },
      {
        name : 'Ethereum Price',
        slug : ''
      },
      {
        name : 'Metaverse Coins',
        slug : ''
      },
      {
        name : 'Meme Coins',
        slug : ''
      },
    ]
  },
  {
    label : 'Resources',
    child : [
      {
        name : 'Perpetuals',
        slug : ''
      },
      {
        name : 'Bitcoin Treasury',
        slug : ''
      },
      {
        name : 'Crypto News',
        slug : ''
      }
    ]
  },
  {
    label : 'GeckoTerminal',
   url : '',
   target : '_blank',
   child : []
  },
  {
    label : 'About CoinGecko',
    child : [
      {
        name : 'About Us',
        slug : ''
      },
      {
        name : 'Careers',
        slug : ''
      },
      {
        name : 'Branding Guides',
        slug : ''
      }
    ]
  },
  {
    label : 'Help',
    child : [
      {
        name : 'Help Center',
        slug : ''
      },
      {
        name : 'FAQ',
        slug : ''
      },
      {
        name : 'Bug Bounty',
        slug : ''
      }
    ]
  }
]

const items = menuList.map((item)=> {
  return getItem(item.label,item.label,null,item.child.map(itemChild => {
    return getItem(itemChild.name,itemChild.name,null)
  }))
})



function HeaderMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = (e) => {
      console.log('click ', e);
  };


  

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // function

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
          <a  className="header-logo flex items-center" href="https://www.coingecko.com/">
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
        <div className="bottom_header"></div>
      </div>
      <Modal className="modal" title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
      <Menu
      onClick={onClick}
      style={{
        width: '100%',
      }}
      mode="inline"
      items={items}
    />
      </Modal>
    </div>
  );
}

export default HeaderMobile;



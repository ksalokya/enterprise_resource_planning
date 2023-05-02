import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from '../../App';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import './widget.css'

function Widget({ type }) {

  const isDarkModeEnabled = useContext(DarkMode);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        amount: 35,
        link: "See All Users",
        to: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        diff: 20,
        pos: true
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        amount: 89,
        link: "View All Orders",
        to: "/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        diff: 35,
        pos: false
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        amount: 554,
        link: "View Net Earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        diff: 47,
        pos: true
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        amount: 1054,
        link: "Predict Revenue",
        to: "/prediction",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        diff: 65,
        pos: false
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <Link to={data.to} style={{ textDecoration: "none", color: isDarkModeEnabled ? "#fff" : "#000" }}>
          <span className="link-style">
            {data.link}
          </span>
        </Link>
      </div>
      <div className="right">
        <div className={`percentage ${data.pos ? "positive" : "negative"}`}>
          {data.pos ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          {data.diff} %
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
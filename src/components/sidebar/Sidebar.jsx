import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import './sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo">
          DashBoard
        </span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/delivery" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Delivery</span>
            </li>
          </Link>
          <p className="title">APPLICATIONS</p>
          <Link to="/kanban" style={{ textDecoration: "none" }}>
            <li>
              <ContentPasteIcon className="icon" />
              <span>Kanban</span>
            </li>
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Calendar</span>
            </li>
          </Link>
          <Link to="/sheet" style={{ textDecoration: "none" }}>
            <li>
              <CreateNewFolderIcon className="icon" />
              <span>Spreedsheet</span>
            </li>
          </Link>
          <Link to="/editor" style={{ textDecoration: "none" }}>
            <li>
              <MenuBookIcon className="icon" />
              <span>Editor</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to="/health" style={{ textDecoration: "none" }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
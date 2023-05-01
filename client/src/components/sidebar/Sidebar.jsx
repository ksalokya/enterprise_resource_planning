import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoIcon from '@mui/icons-material/Info';
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './sidebar.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
  borderRadius: '15px',
  p: 4,
};

function Sidebar(props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="sidebar">
      <div className="top" onClick={props.sidebar}>
        <Link to="/home" style={{ textDecoration: "none" }} >
          <span className="logo">
            DashBoard
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/" ? "current-selected" : ""} onClick={props.sidebar}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/users" ? "current-selected" : ""} onClick={props.sidebar}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/orders" ? "current-selected" : ""} onClick={props.sidebar}>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/delivery" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/delivery" ? "current-selected" : ""} onClick={props.sidebar}>
              <LocalShippingIcon className="icon" />
              <span>Delivery</span>
            </li>
          </Link>
          <p className="title">APPLICATIONS</p>
          <Link to="/kanban" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/kanban" ? "current-selected" : ""} onClick={props.sidebar}>
              <ContentPasteIcon className="icon" />
              <span>Kanban</span>
            </li>
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/calendar" ? "current-selected" : ""} onClick={props.sidebar}>
              <CalendarMonthIcon className="icon" />
              <span>Calendar</span>
            </li>
          </Link>
          <Link to="/sheet" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/sheet" ? "current-selected" : ""} onClick={props.sidebar}>
              <CreateNewFolderIcon className="icon" />
              <span>Spreadsheet</span>
            </li>
          </Link>
          <Link to="/editor" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/editor" ? "current-selected" : ""} onClick={props.sidebar}>
              <MenuBookIcon className="icon" />
              <span>Editor</span>
            </li>
          </Link>
          <p className="title">PREDICTION</p>
          <Link to="/prediction" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/prediction" ? "current-selected" : ""} onClick={props.sidebar}>
              <OnlinePredictionIcon className="icon" />
              <span>Predict Revenue</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to="/health" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/health" ? "current-selected" : ""} onClick={props.sidebar}>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <p className="title">USER</p>
            <li className={location.pathname === "/profile" ? "current-selected" : ""} onClick={props.sidebar}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2" style={{ color: 'rgb(26, 115, 232)', textDecoration: 'underline' }}>
                DashBoard
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Dashboard is an information management tool used to track KPIs , metrics, and key data points that are relevant to your business, department, or a specific process.
              </Typography>
            </Box>
          </Modal>
          <li onClick={handleOpen} >
            <InfoIcon className="icon" />
            <span>About</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
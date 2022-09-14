import { Link } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import TextField from '@mui/material/TextField';
import "./navbar.css"


function Navbar(props) {

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <TextField id="outlined-basic" label="Search..."
                        variant="outlined" />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icon" />
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon
                            className="icon"
                        />
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon onClick={props.handle.enter} className="icon" />
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className="icon" />
                    </div>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <img
                                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                                className="avatar"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
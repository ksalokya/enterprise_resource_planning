import { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Modal from '@mui/material/Modal';
import { DarkMode } from '../../App'
import './modal.css';
import NoImage from './no_image.jpg'

const inputs = [
    {
        id: 1,
        label: "Username",
        type: "text",
        placeholder: "john_doe",
    },
    {
        id: 2,
        label: "Full Name",
        type: "text",
        placeholder: "John Doe",
    },
    {
        id: 3,
        label: "Email",
        type: "mail",
        placeholder: "john_doe@gmail.com",
    },
    {
        id: 4,
        label: "Phone",
        type: "text",
        placeholder: "+91 234 567 89",
    },
    {
        id: 5,
        label: "Password",
        type: "password",
        placeholder: "********"
    },
    {
        id: 6,
        label: "Address",
        type: "text",
        placeholder: "216, CP, New Delhi",
    },
    {
        id: 7,
        label: "Country",
        type: "text",
        placeholder: "India",
    },
];

export default function NewUser(props) {
    let isDarkModeEnabled = useContext(DarkMode);
    const matches400px = useMediaQuery('(max-width: 400px)')
    const matches650px = useMediaQuery('(max-width: 650px)')

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.toggleModal();
    }

    useEffect(() => {
        if (props.open === true) handleOpen();
    }, [props.open])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: matches650px ? (matches400px ? 350 : 400) : 600,
                    bgcolor: isDarkModeEnabled ? '#121212' : '#fff',
                    border: 'none',
                    borderRadius: '15px',
                    boxShadow: 24,
                    p: matches650px ? 0 : 2,
                }}
                >
                    <div className="new">
                        <div className="newContainer">
                            <div className="top">
                                <h1>Add New User</h1>
                            </div>
                            <div className={`bottom ${isDarkModeEnabled ? 'bottom-dark' : ''}`}>
                                <div className="left">
                                    <img
                                        src={file ? URL.createObjectURL(file) : NoImage}
                                        alt=""
                                    />
                                </div>
                                <div className="right">
                                    <form>
                                        <div className="formInput">
                                            <label htmlFor="file">
                                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                onChange={(e) => setFile(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                        {inputs.map((input) => (
                                            <div className="formInput" key={input.id}>
                                                <label>{input.label}</label>
                                                <input type={input.type} placeholder={input.placeholder} />
                                            </div>
                                        ))}
                                        <button>Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}

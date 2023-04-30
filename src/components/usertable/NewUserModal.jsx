import { useState,useEffect } from "react";
import Box from '@mui/material/Box';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Modal from '@mui/material/Modal';
import './modal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '0px',
    borderRadius: '15px',
    boxShadow: 24,
    p: 2,
};

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
    const [open, setOpen] = useState(true);
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
                <Box sx={style}>
                    <div className="new">
                        <div className="newContainer">
                            <div className="top">
                                <h1>Add New User</h1>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <img
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        }
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
        </div>
    );
}

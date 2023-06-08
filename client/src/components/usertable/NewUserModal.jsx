import { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Modal from '@mui/material/Modal';
import { DarkMode } from '../../App'
import './modal.css';
import NoImage from './no_image.jpg'
import axios from "axios";

const inputs = [
    {
        id: 1,
        label: "Full Name",
        type: "text",
        placeholder: "John Doe",
    },
    {
        id: 2,
        label: "Email",
        type: "mail",
        placeholder: "john_doe@gmail.com",
    },
    {
        id: 3,
        label: "Phone",
        type: "text",
        placeholder: "+91 234 567 89",
    },
    {
        id: 4,
        label: "Status",
        type: "text",
        placeholder: "active"
    },
    {
        id: 5,
        label: "Age",
        type: "text",
        placeholder: "24",
    }
];

export default function NewUser(props) {
    let isDarkModeEnabled = useContext(DarkMode);
    const matches400px = useMediaQuery('(max-width: 400px)')
    const matches650px = useMediaQuery('(max-width: 650px)')

    const [open, setOpen] = useState(false);

    const [username, setUserName] = useState("");
    const [file, setFile] = useState();
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");

    // TODO :: Hanlde with global state management
    const [userId, setUserId] = useState("1");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.toggleModal();
        setFile("");
    }

    useEffect(() => {
        if (props.open === true) handleOpen();
        if (props.rowData) {
            props.rowData.map((val) => {
                setData(val.label, val.value);
            })
        }
    }, [props.open, props.rowData])

    function setData(field, data) {
        switch (field) {
            case "Full Name": setUserName(data);
                break
            case "Email": setEmail(data);
                break
            case "Phone": setContact(data);
                break
            case "Status": setStatus(data);
                break
            default: setAge(data);
        }
    }

    function resetDataAndClodeModal() {
        props.fetchData();
        handleClose();
    }

    function sendData(event) {
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('status', status);
        bodyFormData.append('email', email);
        bodyFormData.append('age', age);
        bodyFormData.append('contact', contact);
        bodyFormData.append('userId', userId)
        if (!props.rowData) {
            bodyFormData.append('image', file);;
            axios.post("http://localhost:8080/api/v1/user/insert", bodyFormData, { "Content-Type": "multipart/form-data" })
                .then((res) => {
                    if (res.status === 201) {
                        resetDataAndClodeModal();
                    }
                }).catch((err) => { console.log(err); })
        } else {
            if (!file) {
                axios.put(`http://localhost:8080/api/v1/user/update/${props.rowId}`, bodyFormData, { "Content-Type": "multipart/form-data" })
                    .then((res) => {
                        if (res.status === 202) {
                            resetDataAndClodeModal();
                        }
                    }).catch((err) => { console.log(err); })
            } else {
                bodyFormData.append('image', file);
                axios.put(`http://localhost:8080/api/v1/user/update/image/${props.rowId}`, bodyFormData, { "Content-Type": "multipart/form-data" })
                    .then((res) => {
                        if (res.status === 202) {
                            resetDataAndClodeModal();
                        }
                    }).catch((err) => { console.log(err); })
            }
        }
    }

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
                                        src={file ? URL.createObjectURL(file) : (props.image ? `data:image/png;base64, ${props.image}` : NoImage)}
                                        alt=""
                                    />
                                </div>
                                <div className="right">
                                    <form onSubmit={(e) => sendData(e)}>
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
                                        {
                                            props.rowData ?
                                                props.rowData.map((input) => (
                                                    <div className="formInput" key={input.id}>
                                                        <label>{input.label}</label>
                                                        <input
                                                            type={input.type}
                                                            placeholder={input.placeholder}
                                                            defaultValue={input.value}
                                                            onChange={(e) => setData(input.label, e.target.value)}
                                                        />
                                                    </div>
                                                ))
                                                :
                                                inputs.map((input) => (
                                                    <div className="formInput" key={input.id}>
                                                        <label>{input.label}</label>
                                                        <input
                                                            type={input.type}
                                                            placeholder={input.placeholder}
                                                            onChange={(e) => setData(input.label, e.target.value)}
                                                        />
                                                    </div>
                                                ))
                                        }
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

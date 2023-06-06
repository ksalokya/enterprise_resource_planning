import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { DarkMode } from '../../App';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { userColumns } from './datasource.js';
import NewUserModal from './NewUserModal'
import ComponentLoader from "../loader/ComponentLoader"
import './datatable.css'

function Datatable() {
    const isDarkModeEnabled = useContext(DarkMode);
    const [loader, setLoader] = useState(true);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);

    const toggleModal = () => setOpen(!open);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/user/get/${1}`)
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.data);
                    setLoader(false);
                }
            })
            .catch((err) => { console.log(err); })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/v1/user/delete/${id}/${1}`)
            .then((res) => {
                setUsers(users.filter((item) => item.id !== id));
            })
            .catch((err) => { console.log(err); });
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{ textDecoration: "none" }}>
                            <div className={`viewButton ${isDarkModeEnabled ? "dark-mode-viewbutton" : ""}`}>Update</div>
                        </Link>
                        <div
                            className={`deleteButton ${isDarkModeEnabled ? "dark-mode-deleteButton" : ""}`}
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className='data-table'>
            {
                loader ?
                    <ComponentLoader />
                    :
                    <>
                        <div className="datatableTitle">
                            Add New User
                            <Button onClick={toggleModal} className="link" variant="text">
                                Add New
                            </Button>
                        </div>
                        <DataGrid
                            rows={users}
                            columns={userColumns.concat(actionColumn)}
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 50]}
                            checkboxSelection
                            sx={{
                                color: isDarkModeEnabled ? '#fff' : ''
                            }}
                        />
                    </>
            }
            <NewUserModal open={open} toggleModal={toggleModal} />
        </div>
    )
}

export default Datatable
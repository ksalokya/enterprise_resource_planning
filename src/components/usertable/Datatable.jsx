import { useState, useContext } from 'react';
import { DarkMode } from '../../App';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { userColumns, userRows } from './datasource.js';
import NewUserModal from './NewUserModal'
import './datatable.css'

function Datatable() {
    const isDarkModeEnabled = useContext(DarkMode);
    const [data, setData] = useState(userRows);
    const [open, setOpen] = useState(false);
    const toggleModal = () => setOpen(!open);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
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
                            <div className={`viewButton ${isDarkModeEnabled ? "dark-mode-viewbutton" : ""}`}>View</div>
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
            <div className="datatableTitle">
                Add New User
                <Button onClick={toggleModal} className="link" variant="text">
                    Add New
                </Button>
            </div>
            <DataGrid
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                checkboxSelection
                sx={{
                    color: isDarkModeEnabled ? '#fff' : ''
                }}
            />
            <NewUserModal open={open} toggleModal={toggleModal} />
        </div>
    )
}

export default Datatable
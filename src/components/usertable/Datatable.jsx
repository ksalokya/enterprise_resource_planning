import { useContext } from 'react';
import { DarkMode } from '../../App';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from './datasource.js';
import './datatable.css'

function Datatable() {
    const isDarkModeEnabled = useContext(DarkMode);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className={`viewButton ${isDarkModeEnabled ? "dark-mode-viewbutton" : ""}`}>View</div>
                        </Link>
                        <div className={`deleteButton ${isDarkModeEnabled ? "dark-mode-deleteButton" : ""}`}>
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className='data-table'>
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                checkboxSelection
                sx={{
                    color: isDarkModeEnabled ? '#fff' : ''
                }}
            />
        </div>
    )
}

export default Datatable